import express, { NextFunction, Request, Response } from "express";
import { HttpException } from "../common/httpException";

export default class AutoCompleteController {
	public static async getPlaces(
		req: Request,
		res: Response,
		next: NextFunction
	) {
		const searchString = req.url.split("?")[1];
		const searchParams = new URLSearchParams(searchString);
		const queryParam = searchParams.get("query");

		if (!queryParam) {
			// const error = new HttpException(
			// 	"Invalid request (bad request; a required parameter is missing; invalid version; invalid format)",
			// 	400
			// );
			const error = new HttpException(
				"BadRequest",
				"Invalid request (bad request; a required parameter is missing; invalid version; invalid format)"
			);
			return next(error);
		}

		console.log("/n");
		console.log(searchParams.get("query"));
		console.log("/n");

		// Iterating the search parameters
		for (const p of searchParams) {
			console.log(p);
		}

		res.status(200).json({
			success: true,
		});
	}
}
