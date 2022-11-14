import { HttpException } from "../../common/httpException";
import { config } from "../../config";
import { IGeoCodeService } from "../../declarations/interfaces";
import { GeoCodedLocation, GeoCodeResult } from "../../declarations/types";
import data from "../data/geoCode.response.json";

const baseURL: string = config.envVars.api.map.baseURL || "";

export default class GeoCodeServiceStub implements IGeoCodeService {
	#baseURL = baseURL;

	public static geoCodeAddress = async function (query: string) {
		// 1. Set up request config

		// 2. Attempt to make the request

		// 2.1 Throw error if request attempt fails

		// 3. Return result
		let result: GeoCodeResult;
		result = await new Promise<GeoCodeResult>((resolve, reject) => {
			let results: GeoCodedLocation[] = [];
			const test = setTimeout(() => {
				let apiResult: GeoCodeResult = data;
				data.result.map((place) => {
					if (
						place.formatted_address.toLowerCase().match(query.toLowerCase())
					) {
						results.push(place);
					}
				});

				if (results.length > 0) {
					apiResult.result = results;
					apiResult.number_of_records = results.length;
					resolve(apiResult);
				} else {
					const error = new HttpException("NotFound", "No results found");
					reject(error);
				}
			}, 1000);
		});

		return result;
	};
}
