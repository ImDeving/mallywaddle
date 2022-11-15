import dotenv from "dotenv";

dotenv.config();

/**
 * Server Env Vars
 */
const SERVER_HOSTNAME = process.env.SERVER_HOSTNAME || "localhost";
const SERVER_PORT: number = parseInt(process.env.PORT as string, 10) || 7000;

const SERVER = {
	hostName: SERVER_HOSTNAME,
	port: SERVER_PORT,
};

/**
 * Api Env Vars
 */
const API_BASE_URL = process.env.API_BASE_URL;
const API_KEY_NAME = process.env.API_KEY_NAME;
const API_KEY_VALUE = process.env.API_KEY_VALUE;
const API_AC_PATH = process.env.API_AC_PATH;
const API_GC_PATH = process.env.API_GC_PATH;
const API_TOKEN_URL = process.env.API_TOKEN_URL;
const API_CLIENT_NAME = process.env.API_CLIENT_NAME;
const API_CLIENT_VALUE = process.env.API_CLIENT_VALUE;
const API_SECRET_NAME = process.env.API_SECRET_NAME;
const API_SECRET_VALUE = process.env.API_SECRET_VALUE;
const API_GRANT_NAME = process.env.API_GRANT_NAME;
const API_GRANT_VALUE = process.env.API_GRANT_VALUE;

const API = {
	map: {
		baseURL: API_BASE_URL,
		apiKeyName: API_KEY_NAME,
		apiKeyValue: API_KEY_VALUE,
		autoCompletePath: API_AC_PATH,
		geoCodePath: API_GC_PATH,
		apiTokenURL: API_TOKEN_URL,
		apiClientName: API_CLIENT_NAME,
		apiClientValue: API_CLIENT_VALUE,
		apiSecretName: API_SECRET_NAME,
		apiSecretValue: API_SECRET_VALUE,
		apiGrantName: API_GRANT_NAME,
		apiGrantValue: API_GRANT_VALUE,
	},
};

/**
 * App Env Vars
 */
const envVars = {
	server: SERVER,
	api: API,
};

export default envVars;
