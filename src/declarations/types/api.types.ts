export interface Place {
	place_id: string;
	seoid: string;
	sfid: string;
	description: string;
	title: string;
	types: string[];
}

export interface APIResult {
	code: number;
	message: string;
	source: string;
	result: Place[];
}

interface test {
	result: {
		place_id: string;
		seoid: string;
		sfid: string;
		description: string;
		title: string;
		types: string[];
	}[];
	code: number;
	message: string;
	source: string;
}
