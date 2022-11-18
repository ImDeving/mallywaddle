import express, { NextFunction, Request, Response } from "express";
import { HttpException } from "../common/httpException";
import { geoCodeService } from "../services";

let cacheData: any;
let cacheTime: any;

export default class GeoCodeController {
	public static async geoCodeAddress(
		req: Request,
		res: Response,
		next: NextFunction
	) {
		const searchString = req.url.split("?")[1];
		const searchParams = new URLSearchParams(searchString);
		const queryParam = searchParams.get("query")?.trim();

		// 1. If queryParam = null, throw BadRequest HttpError
		if (!queryParam) {
			// 1.1 queryParam = null, throwing BadRequest HttpError
			const error = new HttpException(
				"BadRequest",
				"Missing required request parameters: [query]"
			);
			return next(error);
		}

		// console.log({ headers: req.headers });
		console.log({ queryParam });
		const authHeaderValue = req.headers.authorization || "";

		// In memory cache
		if (cacheTime && cacheTime > Date.now() - 30 * 1000) {
			return res.json(cacheData);
		}

		// 2. Make call to API
		try {
			const places = await geoCodeService.geoCodeAddress(
				// encodeURI(searchParams),
				queryParam,
				authHeaderValue
			);
			console.log({ places });
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
