import { HttpException } from "../common/httpException";
import { config } from "../config";
import { IAutoCompleteService } from "../declarations/interfaces";
import { Place, AutoCompleteResult } from "../declarations/types";
import data from "../stubs/data/autoComplete.response.json";

const baseURL: string = config.envVars.api.map.baseURL || "";

export default class AutoCompleteService implements IAutoCompleteService {
	#baseURL = baseURL;

	public static getPlaces = async function (query: string) {
		// 1. Set up request config

		// 2. Attempt to make the request

		// 2.1 Throw error if request attempt fails

		// 3. Return result
		let result: AutoCompleteResult;
		result = await new Promise<AutoCompleteResult>((resolve, reject) => {
			let results: Place[] = [];
			const test = setTimeout(() => {
				let apiResult: AutoCompleteResult = data;
				data.result.map((place) => {
					if (
						place.title.toLowerCase().includes(query.toLowerCase()) ||
						place.description.toLowerCase().includes(query.toLowerCase())
					) {
						results.push(place);
					}
				});

				if (results.length > 0) {
					apiResult.result = results;
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
