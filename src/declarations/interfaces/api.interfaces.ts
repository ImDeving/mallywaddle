import { AutoCompleteResult, GeoCodeResult } from "../types";

export abstract class IAutoCompleteService {
	protected static baseURL: string;
	public static getPlaces: (query: string) => Promise<AutoCompleteResult[]>;
}

export abstract class IGeoCodeService {
	protected static baseURL: string;
	public static geoCodeAddress: (query: string) => Promise<GeoCodeResult[]>;
}

export abstract class IApiAuthService {
	protected static baseURL: string;
	public static getToken: (query?: string) => Promise<any[]>;
}
