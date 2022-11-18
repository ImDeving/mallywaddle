import needle from "needle";
import { HttpException } from "../common/httpException";
import { config } from "../config";
import { IGeoCodeService } from "../declarations/interfaces";
import { GeoCodeResult } from "../declarations/types";

const baseURL = config.envVars.api.map.baseURL || "";
const geoCodePath = config.envVars.api.map.geoCodePath || "";
const apiKeyName = config.envVars.api.map.apiKeyName || "";
const apiKeyValue = config.envVars.api.map.apiKeyValue || "";

export default class GeoCodeService implements IGeoCodeService {
	#baseURL = baseURL;

	public static geoCodeAddress = async function (
		query: string,
		authHeaderValue: string
	) {
		// 1. Set up request config
		const headers: { [key: string]: string } = {};
		headers[`${apiKeyName}`] = apiKeyValue;
		headers["Authorization"] = `${authHeaderValue}`;
		const url = `${baseURL}${geoCodePath}?query=${query}`;

		const reqConfig = {
			headers,
		};

		console.log({ url, reqConfig });

		// 2. Attempt to make the request
		const apiRes = await new Promise<GeoCodeResult>((resolve, reject) => {
			needle.request("get", url, { query }, { headers }, (err, resp) => {
				if (!err && resp.statusCode == 200) {
					// Successfull API response

					console.log({ response: resp });
					console.log({ body: resp.body });

					// 3. Return result
					return resolve(resp.body);
				}

				if (resp.statusCode == 401) {
					// Throw an error from the API
					console.log({
						APIError: err,
						status: resp.statusCode,
						message: resp?.body?.message,
					});
					const error = new HttpException("UnAuthorized", resp?.body?.message);
					return reject(error);
				}

				// Throw an error from the API
				console.log({ APIError: err, status: resp.statusCode });
				const error = new HttpException("BadRequest", resp?.body?.message);
				return reject(error);
			});
		});

		return apiRes;
	};
}
