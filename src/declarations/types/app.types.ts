import { Request } from "express";

export interface IReq<T = void> extends Request {
	body: T;
}

export type Errors<T> = {
	[P in keyof T]: T[P];
};
