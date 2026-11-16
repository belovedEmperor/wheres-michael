import { matchedData, param, validationResult } from "express-validator";
import { prisma } from "../lib/prisma.js";

const validateIsImage = [
  param("filename")
    .trim()
    .custom((value) => {
      const parts = value.split(".");
      return !isNaN(Number(parts[0])) || parts[1] === "jpg";
    })
    .withMessage("Image is not valid."),
];

export async function getAll(req, res, next) {
  try {
    const images = await prisma.image.findMany({
      omit: {
        boxCornerOneX: true,
        boxCornerOneY: true,
        boxCornerTwoX: true,
        boxCornerTwoY: true,
      },
    });
    return res.json(images);
  } catch (err) {
    console.error(err);
    next(err);
  }
}

export const getOne = [
  validateIsImage,
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { filename } = matchedData(req);
      const image = await prisma.image.findUnique({
        where: { filename: filename },
        omit: {
          boxCornerOneX: true,
          boxCornerOneY: true,
          boxCornerTwoX: true,
          boxCornerTwoY: true,
        },
      });
      return res.json(image);
    } catch (err) {
      console.error(err);
      next(err);
    }
  },
];
