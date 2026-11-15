import { Router } from "express";
import authRouter from "./authRouter.js";
import imagesRouter from "./imagesRouter.js";

const router = Router();

router.use("/auth", authRouter);
router.use("/images", imagesRouter);

export default router;
