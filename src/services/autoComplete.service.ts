import { HttpException } from "../common/httpException";
import { config } from "../config";
import { IAutoCompleteService } from "../declarations/interfaces";
import { Places } from "../declarations/types";
import data from "../stubs/data/autoComplete.response.json";

const baseURL: string = config.envVars.api.map.baseURL || "";

export default class AutoCompleteService implements IAutoCompleteService {
	#baseURL = baseURL;

	public static getPlaces = async function (query: string) {
		// 1. Set up request config

		// 2. Attempt to make the request

		// 2.1 Throw error if request attempt fails

		// 3. Return result
		let result: Places[] = [];
		result = await new Promise<Places[]>((resolve, reject) => {
			let results: Places[] = [];
			const test = setTimeout(() => {
				data.result.map((place) => {
					if (
						place.title.toLowerCase().includes(query.toLowerCase()) ||
						place.description.toLowerCase().includes(query.toLowerCase())
					) {
						results.push({
							place_id: place.place_id,
							description: place.description,
							title: place.title,
							types: place.types,
						});
					}
				});

				if (results.length > 0) {
					resolve(results);
				} else {
					const error = new HttpException("NotFound", "No results found");
					reject(error);
				}
			}, 1000);
		});

		return result;
	};
}
