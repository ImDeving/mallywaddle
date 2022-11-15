import needle from "needle";
import { HttpException } from "../common/httpException";
import { config } from "../config";
import { IGeoCodeService } from "../declarations/interfaces";
import { GeoCodedLocation, GeoCodeResult } from "../declarations/types";
import data from "../stubs/data/geoCode.response.json";

const baseURL = config.envVars.api.map.baseURL || "";
const geoCodePath = config.envVars.api.map.geoCodePath || "";
const apiKeyName = config.envVars.api.map.apiKeyName || "";
const apiKeyValue = config.envVars.api.map.apiKeyValue || "";

export default class GeoCodeService implements IGeoCodeService {
	#baseURL = baseURL;

	public static geoCodeAddress = async function (query: string) {
		// 1. Set up request config
		const token =
			"eyJraWQiOiJXcURTMHRaZ2lQb1wvZnVVWVhnaEVYK21USXRLN25oOFBtT0U1eWw2Zmk4Zz0iLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiIzbHJ1Z3MyaHM0OW84dHZobWRlcHVlNDExdCIsInRva2VuX3VzZSI6ImFjY2VzcyIsInNjb3BlIjoicGxhY2VzXC9nZW9jb2RlLXJlYWQgcGxhY2VzXC9hdXRvY29tcGxldGUtcmVhZCBwbGFjZXNcL2RldGFpbHMtcmVhZCIsImF1dGhfdGltZSI6MTY2ODQyMzMxOCwiaXNzIjoiaHR0cHM6XC9cL2NvZ25pdG8taWRwLmV1LXdlc3QtMS5hbWF6b25hd3MuY29tXC9ldS13ZXN0LTFfVmVucmxGMGxDIiwiZXhwIjoxNjY4NDI2OTE4LCJpYXQiOjE2Njg0MjMzMTgsInZlcnNpb24iOjIsImp0aSI6IjEyOTFjMmE2LTU1YTYtNDUyMC1iODJlLWI0NzU0YjU4ZjlhOCIsImNsaWVudF9pZCI6IjNscnVnczJoczQ5bzh0dmhtZGVwdWU0MTF0In0.CsKXhO2BVB56Bsit9i5NdIN5ODSibhKXx5LgKavRr3edtqn5BZ44CUAel9Hdrpw7gCRVCK3qqeM-2mQyw-MbZDkbGjyFZ66KBhyErj83HW-p5wSLazw61f3Bf3cRAZ-3QC9l3WFiB3QAMvOfMjeCRgm2paamVygfJ7z4r1irBbLwxOKQNEkwJTZdh4RjXDjvzGOHjGVGRei7phlGmqKFwPZRNyQBBJFXwL3m4p-MCFfZp_rZ-MJniViOFCl6ecgjJ72-4PAiT9k6lOncmGrIQpN7dZvIZdkpXt9d7vdhQVFzE1Q6RVbGYGXKTcLA8FrgzoprXZM29xpHMbxLF7naiQ";
		const headers: { [key: string]: string } = {};
		headers[`${apiKeyName}`] = apiKeyValue;
		headers["Authorization"] = `Bearer ${token}`;
		const url = `${baseURL}${geoCodePath}?query=${query}`;

		const reqConfig = {
			headers,
		};

		console.log({ reqConfig });

		// 2. Attempt to make the request
		const apiRes = await new Promise<GeoCodeResult>((resolve, reject) => {
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
