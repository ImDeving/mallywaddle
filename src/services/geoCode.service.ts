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
			"eyJraWQiOiJXcURTMHRaZ2lQb1wvZnVVWVhnaEVYK21USXRLN25oOFBtT0U1eWw2Zmk4Zz0iLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiIzbHJ1Z3MyaHM0OW84dHZobWRlcHVlNDExdCIsInRva2VuX3VzZSI6ImFjY2VzcyIsInNjb3BlIjoicGxhY2VzXC9nZW9jb2RlLXJlYWQgcGxhY2VzXC9hdXRvY29tcGxldGUtcmVhZCBwbGFjZXNcL2RldGFpbHMtcmVhZCIsImF1dGhfdGltZSI6MTY2ODM4MTgxNCwiaXNzIjoiaHR0cHM6XC9cL2NvZ25pdG8taWRwLmV1LXdlc3QtMS5hbWF6b25hd3MuY29tXC9ldS13ZXN0LTFfVmVucmxGMGxDIiwiZXhwIjoxNjY4Mzg1NDE0LCJpYXQiOjE2NjgzODE4MTQsInZlcnNpb24iOjIsImp0aSI6IjRlY2NkZTRkLTFmOGUtNDdkMi1iMDBiLTZjNjE0YmMyZTY4NyIsImNsaWVudF9pZCI6IjNscnVnczJoczQ5bzh0dmhtZGVwdWU0MTF0In0.EALDE1fewWVxFYM0yETGsEFDh6aDF6luEP9Kg6beqSv4Zk1UE63Sr1X1bkDSsbMqDcaPue62YM7gDyR83gQuNv-y3oS2vrDJjZeT28wvwo4_l9D-U1UYQDtWaWQFpj6_7KEdZfPQbXv7-Df-Abw_o-IOVin4EcDccktpWRqx_HmDEudRHuNdiWjEjd2okQg8Ye42WpMShgr_TSb8IA0M-w9dUltA0322gbLlW84LEURHnXyG4DXijUr70t-YyoA7Z4i3_cVuakKTCX5RK4XSSOsr4WFPae0XM35RIV-_cdZMrOIF6t3oi9WFLebKuqcHuyZBwT0FR-bPPOLp6yUuEQ";
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
