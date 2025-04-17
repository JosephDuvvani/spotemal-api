import { Router } from "express";
import {
  endGamePost,
  spotTargetPost,
  startGamePost,
} from "../controllers/gameController.js";

const router = Router();

router.post("/", startGamePost);
router.post("/:gameId/spot", spotTargetPost);
router.post("/:gameId/end", endGamePost);

export default router;
