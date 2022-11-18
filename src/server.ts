import express, { NextFunction, Request, Response } from "express";
import rateLimit from "express-rate-limit";
const slowDown = require("express-slow-down");
import cors from "cors";

import router from "./routes";
import { errorHandler } from "./middleware/error.middleware";
import { HttpException } from "./common/httpException";
import { config } from "./config";
import envVars from "./config/envVars.config";

const limiter = rateLimit({
	// windowMs: 15 * 60 * 1000, // 15 minutes
	windowMs: 1 * 1000, // 1 seconds
	max: 2, // Limit each IP to 2 requests per `window` (here, per 1 seconds)
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

const speedLimiter = slowDown({
	windowMs: 1 * 1000, // 1 second
	delayAfter: 1, // allow 1 request per second, then...
	delayMs: 500, // begin adding 500ms of delay per request above 100:
	// request # 2 is delayed by  500ms
	// request # 3 is delayed by 1000ms
	// request # 4 is delayed by 1500ms
	// etc.
});

const apiKeys = new Map();
apiKeys.set("x-api-key", config.envVars.server.appKey);

const apiKeyMiddleware = (req: Request, res: Response, next: NextFunction) => {
	const apiKey = req.get("x-api-key");
	if (apiKeys.has("x-api-key") && apiKeys.get("x-api-key") == apiKey) {
		next();
	} else {
		const error = new HttpException("BadRequest", "Invalid API KEY");
		next(error);
	}
};

/**
 * App Variables
 */

const app = express();
app.set("trust proxy", 2);

/**
 *  App Configuration
 */
const corsOptions = {
	origin: config.envVars.client.url,
	optionSuccessStatus: 200,
};
console.log({ corsOptions });
app.use(cors(corsOptions));
app.use(express.json());

/**
 * App routes
 */

app.use("/api/v1", limiter, speedLimiter, apiKeyMiddleware, router);

/**
 * Error handling
 */
app.use(errorHandler);
app.use((req, res, next) => {
	const error = new HttpException(
		"NotFound",
		"The requested resource was not found."
	);

	res.status(error.status).json({
		error,
	});
});

export default app;
