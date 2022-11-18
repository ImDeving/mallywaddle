import express, { NextFunction, Request, Response } from "express";
import { HttpException } from "../common/httpException";
import { config } from "../config";
import { apiAuthService } from "../services";

export default class ApiAuthController {
	public static async getToken(
		req: Request,
		res: Response,
		next: NextFunction
	) {
		const searchString = req.url.split("?")[1];
		const searchParams = new URLSearchParams(searchString);
		const queryParam = searchParams.get("query")?.trim();

		// 2. Make call to API
		console.log("2. Make call to API");
		try {
			const token = await apiAuthService.getToken(queryParam);
			return res.status(200).json(token);
		} catch (error) {
			console.log("error: ", error);
			// 2.1. Make call to API failed
			console.log("2.1. Make call to API failed");
			return next(error);
		}
	}

	public static async authorize(
		req: Request,
		res: Response,
		next: NextFunction
	) {
		// 1. Validate request query
		const searchString = req.url.split("?")[1];
		const searchParams = new URLSearchParams(searchString);
		const stateParam = searchParams.get("state")?.trim();

		// 2. If stateParam = null, throw BadRequest HttpError
		if (!stateParam) {
			// 2.1 stateParam = null, throwing BadRequest HttpError
			const error = new HttpException("BadRequest", "Invalid request");
			return next(error);
		}

		// 3. Generate AuthCode
		console.log("2. Generate AuthCode");
		let code: string;
		try {
			code = await apiAuthService.generateAuthCode();
			console.log("code: ", code);
		} catch (error) {
			console.log("error: ", error);
			// 2.1. Generate AuthCode
			console.log("2.1. Generate AuthCode failed");
			return next(error);
		}

		// 4. Cache code for 10 minutes
		console.log("4. Cache code for 10 minutes");

		// 4.1. Cache code for 10 minutes failed
		console.log("4.1. Cache code for 10 minutes failed");

		// 5. return with callbackURL
		console.log("5. return with callbackURL");
		const callbackURL = `/token?code=${code}&state=${stateParam}`;
		res.status(200).json({ code: 200, message: "Ok", result: { callbackURL } });
	}
}
