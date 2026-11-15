import { Router } from "express";
import authRouter from "./authRouter.js";
import imagesRouter from "./imagesRouter.js";
import timesRouter from "./timesRouter.js";

const router = Router();

router.use("/auth", authRouter);
router.use("/images", imagesRouter);
router.use("/times", timesRouter);

export default router;
