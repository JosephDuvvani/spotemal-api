import { Router } from "express";
import { allMapsGet, mapGet } from "../controllers/mapController.js";

const router = Router();

router.get("/", allMapsGet);
router.get("/:mapId", mapGet);

export default router;
