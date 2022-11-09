import HttpStatusCodes from "./HttpStatusCodes";
import { Errors } from "../declarations/types";

export const ErrorCodes = {
	UnKnownError: {
		code: "UnknownError",
		status: HttpStatusCodes.INTERNAL_SERVER_ERROR,
	},
	UnAuthorized: {
		code: "UnAuthorized",
		status: HttpStatusCodes.UNAUTHORIZED,
	},
	NotFound: {
		code: "NotFound",
		status: HttpStatusCodes.NOT_FOUND,
	},
	ValidationError: {
		code: "ValidationError",
		status: HttpStatusCodes.UNPROCESSABLE_ENTITY,
	},
	BadRequest: {
		code: "BadRequest",
		status: HttpStatusCodes.BAD_REQUEST,
	},
} as const;

export class HttpException<T> extends Error {
	code: string;
	status: number;
	errors?: Errors<T>[];
	message: string;
	metaData?: any;
	constructor(
		code: keyof typeof ErrorCodes = "UnKnownError",
		message?: string,
		errors?: Errors<T>[]
	) {
		super();
		this.code = ErrorCodes[code].code;
		this.status = ErrorCodes[code].status;
		this.message = message ? message : "Server Error";
		if (errors) {
			this.errors = errors;
		}
	}
}
