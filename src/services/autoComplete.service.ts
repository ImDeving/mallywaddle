import needle from "needle";
import { HttpException } from "../common/httpException";
import { config } from "../config";
import { IAutoCompleteService } from "../declarations/interfaces";
import { AutoCompleteResult } from "../declarations/types";

const baseURL = config.envVars.api.map.baseURL || "";
const autoCompletePath = config.envVars.api.map.autoCompletePath || "";
const apiKeyName = config.envVars.api.map.apiKeyName || "";
const apiKeyValue = config.envVars.api.map.apiKeyValue || "";

export default class AutoCompleteService implements IAutoCompleteService {
	#baseURL = baseURL;

	public static getPlaces = async (query: string, authHeaderValue: string) => {
		// 1. Set up request config
		const headers: { [key: string]: string } = {};
		headers[`${apiKeyName}`] = apiKeyValue;
		headers["Authorization"] = `${authHeaderValue}`;
		const url = `${baseURL}${autoCompletePath}?query=${query}`;

		const reqConfig = {
			headers,
		};

		console.log({ url, reqConfig });

		// 2. Attempt to make the request
		const apiRes = await new Promise<AutoCompleteResult>((resolve, reject) => {
			needle.request("get", url, { query }, { headers }, (err, resp) => {
				if (!err && resp.statusCode == 200) {
					// Successfull API response

					console.log({ body: resp.body });

					// 3. Return result
					return resolve(resp.body);
				}

				if (resp.statusCode == 401) {
					// Throw an error from the API
					console.log({ APIError: err });
					const error = new HttpException("UnAuthorized", resp?.body?.message);
					return reject(error);
				}

				// Throw an error from the API
				console.log({ APIError: err });
				const error = new HttpException("BadRequest", resp?.body?.message);
				return reject(error);
			});
		});

		return apiRes;
	};
}
