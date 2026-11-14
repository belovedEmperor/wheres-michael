import { Router } from "express";
import { getAll, getOne } from "../../controllers/imageController.js";

const router = Router();

router.get("/", getAll);
router.get("/:filename", getOne);

export default router;
