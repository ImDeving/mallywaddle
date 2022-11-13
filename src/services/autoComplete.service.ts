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
			"eyJraWQiOiJXcURTMHRaZ2lQb1wvZnVVWVhnaEVYK21USXRLN25oOFBtT0U1eWw2Zmk4Zz0iLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiIzbHJ1Z3MyaHM0OW84dHZobWRlcHVlNDExdCIsInRva2VuX3VzZSI6ImFjY2VzcyIsInNjb3BlIjoicGxhY2VzXC9nZW9jb2RlLXJlYWQgcGxhY2VzXC9hdXRvY29tcGxldGUtcmVhZCBwbGFjZXNcL2RldGFpbHMtcmVhZCIsImF1dGhfdGltZSI6MTY2ODM3ODE4NSwiaXNzIjoiaHR0cHM6XC9cL2NvZ25pdG8taWRwLmV1LXdlc3QtMS5hbWF6b25hd3MuY29tXC9ldS13ZXN0LTFfVmVucmxGMGxDIiwiZXhwIjoxNjY4MzgxNzg1LCJpYXQiOjE2NjgzNzgxODUsInZlcnNpb24iOjIsImp0aSI6Ijg0MjNmYTM3LTI0NTEtNDU5Yi1hNTU4LWJlMTQyOTNmNDc3OSIsImNsaWVudF9pZCI6IjNscnVnczJoczQ5bzh0dmhtZGVwdWU0MTF0In0.HHnCGoefJ732n_07hIwirv_YyFj_lAxrDWDiNIYqtISvvRJGxYb52NBcOexuqfb0-9S_tg7Yj3CHPz8ZeoBXWTwvEYJRiv6PVFnRH6jeiV-n3jMEoDdwHdE5e80EG44cGWih8xyOOO8WXI75M46Vbli0O9vTVAClmsp5fyMKR1nEyaK4vtkznbgfC1kWTb-T4VyUNSzz86_ai91UaYxplNX_j3Zp4y-GRDCMfqLMGLFL9MWsCi97lVDXy8ppLgveoaMckvrrZHVn1lrJXNKN1heto5uBc6O9rdH22F9M0NzLdPF-OY5b_3vDo7uwwCFZu5wHVCZvuiiAC2Pou5MTeA";
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
