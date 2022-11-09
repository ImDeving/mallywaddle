import express from "express";
import cors from "cors";

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
 * Error handling
 */
app.use((req, res, next) => {
	// const error = new Error("Not found");

	res.status(404).json({
		message: "Not found",
	});
});

export default app;
