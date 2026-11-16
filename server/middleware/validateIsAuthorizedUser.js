import { matchedData, param, validationResult } from "express-validator";
import {
  validateIsNotEmpty,
  validateNumber,
} from "../controllers/timesControllers.js";
import { prisma } from "../lib/prisma.js";

export default [
  validateIsNotEmpty(param, "id"),
  validateNumber(param, "id"),
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { id } = matchedData(req);
      const time = await prisma.userTimes.findUnique({
        where: { id: Number(id) },
      });
      req.time = time;
      if (!time) return res.sendStatus(404);
      return req.user.id === time.userId ? next() : res.sendStatus(401);
    } catch (err) {
      console.error(err);
      next(err);
    }
  },
];
