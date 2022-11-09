/**
 * Required External Modules
 */
import { config } from "./config";
import express from "express";
import cors from "cors";

/**
 * App Variables
 */
const PORT: number = parseInt(process.env.PORT as string, 10) || 7000;

const app = express();

/**
 *  App Configuration
 */
app.use(cors());
app.use(express.json());

/**
 * Server Activation
 */
app.listen(config.envVars.server.port, () => {
	console.log(`Listening on port ${config.envVars.server.port}`);
});
