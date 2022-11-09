import express, { NextFunction, Request, Response } from "express";
import { autoComplete } from "../controllers";

const router = express.Router();

router.get("/autocomplete", autoComplete.getPlaces);

export default router;
