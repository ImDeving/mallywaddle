import dotenv from "dotenv";

dotenv.config();

/**
 * Server Env Vars
 */
const SERVER_HOSTNAME = process.env.SERVER_HOSTNAME || "localhost";
const SERVER_PORT: number = parseInt(process.env.PORT as string, 10) || 7000;

const SERVER = {
	hostname: SERVER_HOSTNAME,
	port: SERVER_PORT,
};

/**
 * App Env Vars
 */
const envVars = {
	server: SERVER,
};

export default envVars;
