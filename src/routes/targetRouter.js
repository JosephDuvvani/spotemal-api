import { Router } from "express";
import { verifyTargetPost } from "../controllers/targetController.js";

const router = Router();

router.post("/:targetId", verifyTargetPost);

export default router;
