import { Router } from "express";
import { allMapsGet } from "../controllers/mapController.js";
import { scorersGet, scorersPost } from "../controllers/scorerController.js";

const router = Router();

router.get("/", allMapsGet);
router.post("/:mapId/scorer", scorersPost);
router.get("/:mapId/scorer", scorersGet);

export default router;
