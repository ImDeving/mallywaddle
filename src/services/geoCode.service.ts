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
			"eyJraWQiOiJXcURTMHRaZ2lQb1wvZnVVWVhnaEVYK21USXRLN25oOFBtT0U1eWw2Zmk4Zz0iLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiIzbHJ1Z3MyaHM0OW84dHZobWRlcHVlNDExdCIsInRva2VuX3VzZSI6ImFjY2VzcyIsInNjb3BlIjoicGxhY2VzXC9nZW9jb2RlLXJlYWQgcGxhY2VzXC9hdXRvY29tcGxldGUtcmVhZCBwbGFjZXNcL2RldGFpbHMtcmVhZCIsImF1dGhfdGltZSI6MTY2ODUwMTY1NiwiaXNzIjoiaHR0cHM6XC9cL2NvZ25pdG8taWRwLmV1LXdlc3QtMS5hbWF6b25hd3MuY29tXC9ldS13ZXN0LTFfVmVucmxGMGxDIiwiZXhwIjoxNjY4NTA1MjU2LCJpYXQiOjE2Njg1MDE2NTYsInZlcnNpb24iOjIsImp0aSI6IjMzZWRhNDBhLTQxNzgtNGY0NS04NmMzLWJiOWIxMDdmZDA5MCIsImNsaWVudF9pZCI6IjNscnVnczJoczQ5bzh0dmhtZGVwdWU0MTF0In0.SE1iPklh2xxQMuZoV42oHSQMcEcZagn_wgbyJ33ggpHefLuNF8cpGWPH4fN5e67UTLps8dOKkPJzm9gT1RE9UFdBiCUmq1eKaoTkWlG1b-slGNppNga05xqbDCnC0jd81pKDB122nKFqc64bk3dt_vFkM15g5yCtD6uY8U9MNwE408PqxJfGiTIkCj8wbv6SORhqdcoeHlCAYMTm6o6a3CrBJnub7Ij0UEU1UY6OVoZwwxi5vA8jzw4v0tRvc2vtNUDjgOW4D8gWfpoKjc3XRkcNGiwxsTCfT4BGgGCEFdLmRiUUFeLp_316aI5EdKfkML9MuoJgD62joh4pdMmgNQ";
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
