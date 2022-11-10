import express, { NextFunction, Request, Response } from "express";
import { autoComplete, geoCode } from "../controllers";

const router = express.Router();

router.get("/autocomplete", autoComplete.getPlaces);
router.get("/geocode", geoCode.geoCodeAddress);

export default router;
