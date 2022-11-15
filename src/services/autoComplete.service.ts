import needle from "needle";
import { HttpException } from "../common/httpException";
import { config } from "../config";
import { IAutoCompleteService } from "../declarations/interfaces";
import { Place, AutoCompleteResult } from "../declarations/types";
import data from "../stubs/data/autoComplete.response.json";

const baseURL = config.envVars.api.map.baseURL || "";
const autoCompletePath = config.envVars.api.map.autoCompletePath || "";
const apiKeyName = config.envVars.api.map.apiKeyName || "";
const apiKeyValue = config.envVars.api.map.apiKeyValue || "";

export default class AutoCompleteService implements IAutoCompleteService {
	#baseURL = baseURL;

	public static getPlaces = async (query: string) => {
		// 1. Set up request config
		const token =
			"eyJraWQiOiJXcURTMHRaZ2lQb1wvZnVVWVhnaEVYK21USXRLN25oOFBtT0U1eWw2Zmk4Zz0iLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiIzbHJ1Z3MyaHM0OW84dHZobWRlcHVlNDExdCIsInRva2VuX3VzZSI6ImFjY2VzcyIsInNjb3BlIjoicGxhY2VzXC9nZW9jb2RlLXJlYWQgcGxhY2VzXC9hdXRvY29tcGxldGUtcmVhZCBwbGFjZXNcL2RldGFpbHMtcmVhZCIsImF1dGhfdGltZSI6MTY2ODQ5NjY4MCwiaXNzIjoiaHR0cHM6XC9cL2NvZ25pdG8taWRwLmV1LXdlc3QtMS5hbWF6b25hd3MuY29tXC9ldS13ZXN0LTFfVmVucmxGMGxDIiwiZXhwIjoxNjY4NTAwMjgwLCJpYXQiOjE2Njg0OTY2ODAsInZlcnNpb24iOjIsImp0aSI6IjE3MmExMDk0LTVlYjgtNDhjZi04NGRjLTM1YTNmNjNjMzQ2OCIsImNsaWVudF9pZCI6IjNscnVnczJoczQ5bzh0dmhtZGVwdWU0MTF0In0.RWl4cItwQjr39r3Z2iNE-xew_r1nXUs0t3szirnqz8gWBYxSzcxVFhltFR7m5q0z8TqSBbmHKXNK1CZhjAZ9bJbIOlhXiOSSw4s2uUZRA3yxIxeEuci7tHuEWsba_NApKjaZ-gUWA0k8fFOJgajOZpu_Ryq0Y0OQXQZLatrZEkZBazfZJ0zRqSEsP4WilmAJaPUjLKh_jcuoGckh8jsEXNseTjMf4xnp96giU2-ykpVggl7hCEo3B97bBPVEPZ-yonsXhn_0aknLtfsbpugCzL6_gAWvS0_sq9igwZLf6RYVcalog-i_FwXcAm7XIFf5oXjsDGibW8RlbC67L79tsw";
		const headers: { [key: string]: string } = {};
		headers[`${apiKeyName}`] = apiKeyValue;
		headers["Authorization"] = `Bearer ${token}`;
		const url = `${baseURL}${autoCompletePath}?query=${query}`;

		const reqConfig = {
			headers,
		};

		console.log({ reqConfig });

		// 2. Attempt to make the request
		const apiRes = await new Promise<AutoCompleteResult>((resolve, reject) => {
			needle.request("get", url, { query }, { headers }, (err, resp) => {
				if (!err && resp.statusCode == 200) {
					// Successfull API response

					console.log({ Successfull: resp.body });

					// 3. Return result
					return resolve(resp.body);
				}

				// Throw an error from the API
				console.log({ APIError: err });
				const error = new HttpException("BadRequest", err?.message);
				return reject(error);
			});
		});

		return apiRes;
	};
}
