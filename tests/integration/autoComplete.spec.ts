const request = require("supertest");
import app from "../../src/server";
import { ErrorCodes } from "../../src/common/httpException";

describe("autoComplete API", () => {
	it("GET: '/api/v1/autocomplete' with no search params => returns 400, Bad Request", async () => {
		const result = await request(app).get("/api/v1/autocomplete");
		expect(result.status).toEqual(400);
		expect(result.body.error.code).toEqual(ErrorCodes["BadRequest"].code);
		expect(result.body.error.status).toEqual(ErrorCodes["BadRequest"].status);
		expect(result.body.error.message).toEqual(
			"Invalid request (bad request; a required parameter is missing; invalid version; invalid format)"
		);
	});
});
