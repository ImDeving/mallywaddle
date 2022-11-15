import express, { NextFunction, Request, Response } from "express";
import { HttpException } from "../common/httpException";
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

		// 1. If queryParam = null, throw BadRequest HttpError
		// if (!queryParam) {
		// 	// 1.1 queryParam = null, throwing BadRequest HttpError
		// 	const error = new HttpException(
		// 		"BadRequest",
		// 		"Missing required request parameters: [query]"
		// 	);
		// 	return next(error);
		// }

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
}
