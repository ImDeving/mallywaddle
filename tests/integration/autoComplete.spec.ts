const request = require("supertest");
import app from "../../src/server";
import { ErrorCodes } from "../../src/common/httpException";

describe("autoComplete API", () => {
	it("GET: '/api/v1/autocomplete' with no search params => returns BadRequest HttpException", async () => {
		const result = await request(app).get("/api/v1/autocomplete");

		function testBadRequestError(result: any) {
			expect(result.status).toEqual(400);
			expect(result.body.error.code).toEqual(ErrorCodes["BadRequest"].code);
			expect(result.body.error.status).toEqual(ErrorCodes["BadRequest"].status);
			expect(result.body.error.message).toEqual(
				"Missing required request parameters: [query]"
			);
		}

		testBadRequestError(result);
	});

	it("GET: '/api/v1/autocomplete?query=midrand' => returns 200, with response data", async () => {
		const query = "midrand";
		const result = await request(app).get(
			`/api/v1/autocomplete?query=${query}`
		);
		expect(result.status).toEqual(200);
		expect(result.body.error).toBeUndefined;
		expect(result.body.data).toBeDefined;
		expect(result.body.message).toBeDefined;

		// Test if all the results contain the query string
		result.body.data.map((place: any) => {
			const condition =
				place.title.toLowerCase().includes(query.toLowerCase()) ||
				place.description.toLowerCase().includes(query.toLowerCase());
			expect(condition).toBe(true);
		});
	});
});
