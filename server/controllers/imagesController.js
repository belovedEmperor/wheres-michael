import { prisma } from "../lib/prisma.js";

export async function getAll(req, res, next) {
  try {
    const images = await prisma.image.findMany();
    return res.json(images);
  } catch (err) {
    console.error(err);
    next(err);
  }
}

export async function getOne(req, res, next) {
  try {
    const image = await prisma.image.findUnique({
      where: { filename: req.params.filename },
    });
    return res.json(image);
  } catch (err) {
    console.error(err);
    next(err);
  }
}
