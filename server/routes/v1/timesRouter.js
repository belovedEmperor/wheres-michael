import { Router } from "express";
import {
  create,
  getMany,
  getOne,
  remove,
  update,
} from "../../controllers/timesControllers.js";
import validateAuth from "../../middleware/validateAuth.js";
import validateTimeIsUsers from "../../middleware/validateIsAuthorizedUser.js";

const router = Router();

router.get("/", getMany);
router.get("/:id", getOne);
router.post("/", validateAuth, create);
router.patch("/:id", validateAuth, validateTimeIsUsers, update);
router.delete("/:id", validateAuth, validateTimeIsUsers, remove);

export default router;
