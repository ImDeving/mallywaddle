export interface Place {
	place_id: string;
	seoid: string;
	sfid: string;
	description: string;
	title: string;
	types: string[];
}

export interface GeoCodedLocation {
	place_id: string;
	seoid: string;
	sfid: string;
	formatted_address: string;
	confidence: {
		confidence_id: number;
		description: string;
	};
	location: {
		lat: number;
		lng: number;
	};
	types: string[];
}

export interface AutoCompleteResult {
	code: number;
	message: string;
	source: string;
	result: Place[];
}

export interface GeoCodeResult {
	code: number;
	number_of_records: number;
	message: string;
	source: string;
	result: GeoCodedLocation[];
}
