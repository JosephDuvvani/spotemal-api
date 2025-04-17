import { Router } from "express";
import { allMapsGet } from "../controllers/mapController.js";

const router = Router();

router.get("/", allMapsGet);

export default router;
