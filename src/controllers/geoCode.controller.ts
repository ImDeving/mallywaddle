import express, { NextFunction, Request, Response } from "express";
import url from "url";
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

		console.log({ queryParam: queryParam! });
		console.log({ queryParam: searchParams.get("query")! });
		console.log({ queryParam: searchParams.get("max_results")! });
		console.log({ parsedURLQuery: parsedURL.query });
		// console.log({ headers: req.headers });
		const authHeaderValue = req.headers.authorization || "";

		// In memory cache
		// if (cacheTime && cacheTime > Date.now() - 30 * 1000) {
		// 	return res.json(cacheData);
		// }

		// 2. Make call to API
		try {
			const places = await geoCodeService.geoCodeAddress(
				decodeURI(searchParams.get("query")!),
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
