import express, { NextFunction, Request, Response } from "express";
import url from "url";
import { HttpException } from "../common/httpException";
import { autoCompleteService } from "../services";

let cacheData: any;
let cacheTime: any;

export default class AutoCompleteController {
	public static async getPlaces(
		req: Request,
		res: Response,
		next: NextFunction
	) {
		const parsedURL = url.parse(req.url);

		console.log("parsedURL: ", parsedURL);

		console.log("req params: ", req.params);

		// 1. If queryParam = null, throw BadRequest HttpError
		if (!parsedURL.query) {
			// 1.1 queryParam = null, throwing BadRequest HttpError
			const error = new HttpException(
				"BadRequest",
				"Missing required request parameters: [query]"
			);
			return next(error);
		}

		const searchParams = new URLSearchParams(parsedURL.query);
		const queryParam = searchParams.get("query")?.trim();

		console.log({ queryParam: JSON.parse(queryParam!) });
		console.log({ headers: req.headers });
		const authHeaderValue = req.headers.authorization || "";

		// In memory cache
		if (cacheTime && cacheTime > Date.now() - 30 * 1000) {
			return res.json(cacheData);
		}

		// 2. Make call to API
		try {
			const places = await autoCompleteService.getPlaces(
				JSON.parse(queryParam!),
				authHeaderValue
			);
			cacheData = places;
			cacheTime = Date.now();
			places.cacheTime = cacheTime;
			return res.status(200).json(places);
		} catch (error) {
			console.log("error: ", error);
			// 2.1 Make call to API failed
			return next(error);
		}
	}
}
