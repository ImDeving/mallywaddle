import { Places } from "../types";

export abstract class IAutoCompleteService {
	protected static baseURL: string;
	public static getPlaces: (query: string) => Promise<Places[]>;
}
