/**
 * Required External Modules
 */
import { config } from "./config";
import app from "./server";

/**
 * Server Activation
 */
app.listen(config.envVars.server.port, () => {
	console.log(`Listening on port ${config.envVars.server.port}`);
});
