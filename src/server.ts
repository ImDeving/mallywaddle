import express, { NextFunction, Request, Response } from "express";
import cors from "cors";

import router from "./routes";
import { errorHandler } from "./middleware/error.middleware";
import { HttpException } from "./common/httpException";

/**
 * App Variables
 */

const app = express();

/**
 *  App Configuration
 */
app.use(cors());
app.use(express.json());

/**
 * App routes
 */

app.use("/api/v1", router);

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
