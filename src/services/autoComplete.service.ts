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
			"eyJraWQiOiJXcURTMHRaZ2lQb1wvZnVVWVhnaEVYK21USXRLN25oOFBtT0U1eWw2Zmk4Zz0iLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiIzbHJ1Z3MyaHM0OW84dHZobWRlcHVlNDExdCIsInRva2VuX3VzZSI6ImFjY2VzcyIsInNjb3BlIjoicGxhY2VzXC9nZW9jb2RlLXJlYWQgcGxhY2VzXC9hdXRvY29tcGxldGUtcmVhZCBwbGFjZXNcL2RldGFpbHMtcmVhZCIsImF1dGhfdGltZSI6MTY2ODM4NTU4MSwiaXNzIjoiaHR0cHM6XC9cL2NvZ25pdG8taWRwLmV1LXdlc3QtMS5hbWF6b25hd3MuY29tXC9ldS13ZXN0LTFfVmVucmxGMGxDIiwiZXhwIjoxNjY4Mzg5MTgxLCJpYXQiOjE2NjgzODU1ODEsInZlcnNpb24iOjIsImp0aSI6ImFlYjc2Y2VjLTU1ZWMtNDdkOC1hNDFmLTYwNTQ1ZGQ4YTlmOSIsImNsaWVudF9pZCI6IjNscnVnczJoczQ5bzh0dmhtZGVwdWU0MTF0In0.f3e8WEQmvQ0Gz3aWYcvD3O08Ytp3cMnhPJjfv39KkLHb72QgWQsW-FD8XW7w1yt_chm3hspVH_uHCTMnrLwuWNlDw5o3zBuSMkaKMWCz-BPL2qbpjH3paiuIuXzwQOBEVzCkEbeX1J8WFfaG9aNQwk_ezoBftwmuvmPm4x6Gy2uNzsgtobhwsS83Zr39FDIQB9d_1PqnLCY4cMSIRtw4tXk7Dxic4tc1IM2OEOEIhiGqwJjfG--Ndxomkw5VjB_OyAU9AA5KrJRbSvh3-iADgNxKNK3UUTtX1OjOdc-jRJk1upKJLDJsdytKgVVuWcPCrThzQBro9FwGdRh7E6S8Zg";
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
