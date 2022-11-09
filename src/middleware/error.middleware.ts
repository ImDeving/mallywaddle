import { HttpException } from "../common/httpException";
import { Request, Response, NextFunction } from "express";

export const errorHandler = (
	error: HttpException<any>,
	req: Request,
	res: Response,
	next: NextFunction
) => {
	if (error instanceof HttpException) {
		res.status(error.status).json({
			error,
		});
	} else {
		const err = new HttpException("UnKnownError");
		res.status(err.status).json({
			err,
		});
	}
};
