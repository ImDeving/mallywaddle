import { randomBytes } from "crypto";
import needle from "needle";
import { HttpException } from "../common/httpException";
import { config } from "../config";
import { IApiAuthService } from "../declarations/interfaces";
import { GeoCodedLocation, GeoCodeResult } from "../declarations/types";

const url = config.envVars.api.map.apiTokenURL || "";
const apiGrantName = config.envVars.api.map.apiGrantName || "";
const apiGrantValue = config.envVars.api.map.apiGrantValue || "";
const apiClientName = config.envVars.api.map.apiClientName || "";
const apiClientValue = config.envVars.api.map.apiClientValue || "";
const apiSecretName = config.envVars.api.map.apiSecretName || "";
const apiSecretValue = config.envVars.api.map.apiSecretValue || "";

export default class ApiAuthService implements IApiAuthService {
	baseURL = url;

	public static generateAuthCode = async function () {
		// 1. Generate random string
		console.log("1. Generate random string");
		try {
			const buf = randomBytes(256);
			const code = buf.toString("hex");
			console.log(`${buf.length} bytes of random data: ${code}`);
			return code;
		} catch (error: any) {
			// 2.1. Generate random string failed
			console.log("2.1. Generate random string failed");
			console.log({ ApiAuthServiceError: error });
			throw new HttpException("UnKnownError", error?.message);
		}
	};

	public static getToken = async function (query?: string) {
		// 1. Set up request config
		console.log("1. Set up request config");

		const body: { [key: string]: string } = {};
		body[`${apiGrantName}`] = apiGrantValue;
		body[`${apiClientName}`] = apiClientValue;
		body[`${apiSecretName}`] = apiSecretValue;

		// 2. Attempt to make the request
		console.log("2. Attempt to make the request");
		try {
			const response = await needle("post", url, { ...body });
			console.log("Token: ", response.body);
			const token = response.body;

			// 3. Return result
			console.log("3. Return result");
			return token;
		} catch (error: any) {
			// 2.1. Attempt to make the request failed
			console.log("2.1. Attempt to make the request failed");
			console.log({ APIError: error });
			throw new HttpException("BadRequest", error?.message);
		}
	};
}
