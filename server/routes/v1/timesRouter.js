import { Router } from "express";
import {
  create,
  getMany,
  getOne,
  remove,
  update,
} from "../../controllers/timesControllers.js";
import validateAuth from "../../middleware/validateAuth.js";
import validateIsAuthorizedUser from "../../middleware/validateIsAuthorizedUser.js";

const router = Router();

router.get("/", getMany);
router.get("/:id", getOne);
router.post("/", validateAuth, create);
router.patch("/:id", validateAuth, validateIsAuthorizedUser, update);
router.delete("/:id", validateAuth, validateIsAuthorizedUser, remove);

export default router;
