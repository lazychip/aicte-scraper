import { Router } from "express";
import { aicteController } from "../controllers";
const router = Router();

router.get("/initiatives", aicteController.getInitiatives);

export default router;