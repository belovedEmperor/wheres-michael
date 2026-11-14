import { Router } from "express";
import authRouter from "./authRouter.js";
import imageRouter from "./imageRouter.js";

const router = Router();

router.use("/auth", authRouter);
router.use("/images", imageRouter);

export default router;
