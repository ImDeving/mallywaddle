import express, { NextFunction, Request, Response } from "express";
import { apiAuth, autoComplete, geoCode } from "../controllers";

const router = express.Router();

router.get("/autocomplete", autoComplete.getPlaces);
router.get("/geocode", geoCode.geoCodeAddress);
router.get("/authorize", apiAuth.authorize);
router.get("/token", apiAuth.getToken);

export default router;
