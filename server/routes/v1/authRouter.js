import { Router } from "express";
import {
  get,
  login,
  logout,
  register,
  remove,
  update,
} from "../../controllers/authController.js";
import validateNoAuth from "../../middleware/validateNoAuth.js";
import validateAuth from "../../middleware/validateAuth.js";

const router = Router();

router.post("/register", validateNoAuth, register);
router.post("/login", validateNoAuth, login);
router.post("/logout", validateAuth, logout);
router.get("/me", validateAuth, get);
router.patch("/me", validateAuth, update);
router.delete("/me", validateAuth, remove);

export default router;
