import {
  body,
  matchedData,
  param,
  query,
  validationResult,
} from "express-validator";
import { prisma } from "../lib/prisma.js";

const emptyErr = "must not be empty.";
const numberErr = "must be a number.";

export const validateIsNotEmpty = (type, field) => [
  type(field).trim().notEmpty().withMessage(`${field} ${emptyErr}`),
];

export const validateNumber = (type, field) => [
  type(field)
    .optional()
    .trim()
    .isNumeric()
    .withMessage(`${field} ${numberErr}`),
];

const validateSort = [
  query("sort")
    .optional({ checkFalsy: true })
    .trim()
    .toLowerCase()
    .customSanitizer((value) =>
      value === "descending" ? "desc" : value === "ascending" ? "asc" : value,
    )
    .custom((value) => value === "desc" || value === "asc")
    .withMessage('Sort must be "desc" or "asc".'),
];

export const getOne = [
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
      return res.json(time);
    } catch (err) {
      console.error(err);
      next(err);
    }
  },
];

export const getMany = [
  validateNumber(query, "userId"),
  validateNumber(query, "imageId"),
  validateNumber(query, "limit"),
  validateNumber(query, "offset"),
  validateSort,
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { userId, imageId, sort, limit, offset } = matchedData(req);
      const order = sort?.toLowerCase() === "desc" ? "desc" : "asc";
      const times = await prisma.userTimes.findMany({
        where: {
          userId: userId ? Number(userId) : undefined,
          imageId: imageId ? Number(imageId) : undefined,
        },
        orderBy: sort ? { durationMs: order } : undefined,
        take: Number(limit) || 20,
        skip: Number(offset) || 0,
      });
      return res.json(times);
    } catch (err) {
      console.error(err);
      next(err);
    }
  },
];

export const create = [
  validateIsNotEmpty(body, "imageId"),
  validateNumber(body, "imageId"),
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { imageId } = matchedData(req);
      const time = await prisma.userTimes.create({
        data: { userId: req.user.id, imageId: Number(imageId) },
      });
      return res.status(201).json(time);
    } catch (err) {
      console.error(err);
      next(err);
    }
  },
];

async function checkGuess(req, x, y) {
  const image = await prisma.image.findUnique({
    where: { id: req.time.imageId },
  });
  if (
    image.boxCornerOneX <= x &&
    x <= image.boxCornerTwoX &&
    image.boxCornerOneY <= y &&
    y <= image.boxCornerTwoY
  )
    return true;
  else return false;
}

export const update = [
  validateIsNotEmpty(body, "guessX"),
  validateIsNotEmpty(body, "guessY"),
  validateIsNotEmpty(param, "id"),
  validateNumber(body, "guessX"),
  validateNumber(body, "guessY"),
  validateNumber(param, "id"),
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { id, guessX, guessY } = matchedData(req);
      if (!guessX || !guessY) throw new Error("Guess coordinates not found.");
      if (!(await checkGuess(req, guessX, guessY)))
        return res.json({ message: "Wrong guess" });

      const endTime = new Date();
      const time = await prisma.userTimes.update({
        where: { id: Number(id) },
        data: {
          endTime,
          durationMs: endTime - new Date(req.time.startTime),
          guessX: Number(guessX),
          guessY: Number(guessY),
        },
      });
      return res.json(time);
    } catch (err) {
      console.error(err);
      next(err);
    }
  },
];

export const remove = [
  validateIsNotEmpty(param, "id"),
  validateNumber(param, "id"),
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { id } = matchedData(req);
      await prisma.userTimes.delete({ where: { id: Number(id) } });
      return res.sendStatus(204);
    } catch (err) {
      console.error(err);
      next(err);
    }
  },
];
