import { Router } from "express";
import aicteRoute from "./aicte.route";

const router = Router();

router.use("/aicte", aicteRoute);

export { router };
