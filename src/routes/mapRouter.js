import { Router } from "express";
import { allMapsGet } from "../controllers/mapController.js";
import { scorersPost } from "../controllers/scorerController.js";

const router = Router();

router.get("/", allMapsGet);
router.post("/:mapId/scorer", scorersPost);

export default router;
