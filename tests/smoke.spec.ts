const request = require("supertest");
import app from "../src/server";

describe("app runs", () => {
	it("GET to '/' returns 404", async () => {
		const result = await request(app).get("/");
		expect(result.status).toEqual(404);
		expect(result.body.message).toEqual("Not found");
	});
});
