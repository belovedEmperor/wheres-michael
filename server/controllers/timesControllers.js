import { prisma } from "../lib/prisma.js";

export async function getOne(req, res, next) {
  try {
    const time = await prisma.userTimes.findUnique({
      where: { id: Number(req.params.id) },
    });
    return res.json(time);
  } catch (err) {
    console.error(err);
    next(err);
  }
}

export async function getMany(req, res, next) {
  const { userId, imageId, sort, limit, offset } = req.query;
  const order = sort?.toLowerCase() === "desc" ? "desc" : "asc";
  try {
    const times = await prisma.userTimes.findMany({
      where: {
        userId: userId ? Number(userId) : undefined,
        imageId: imageId ? Number(imageId) : undefined,
      },
      orderBy: sort ? { durationMs: order, nulls: "last" } : undefined,
      take: Number(limit) || 20,
      skip: Number(offset) || 0,
    });
    return res.json(times);
  } catch (err) {
    console.error(err);
    next(err);
  }
}

export async function create(req, res, next) {
  try {
    const { userId, imageId } = req.body;
    const time = await prisma.userTimes.create({
      data: { userId: Number(userId), imageId: Number(imageId) },
    });
    return res.status(201).json(time);
  } catch (err) {
    console.error(err);
    next(err);
  }
}

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

export async function update(req, res, next) {
  try {
    const { guessX, guessY } = req.body;
    if (!guessX || !guessY) throw new Error("Guess coordinates not found.");
    if (!(await checkGuess(req, guessX, guessY)))
      return res.json({ message: "Wrong guess" });

    const endTime = new Date();
    const time = await prisma.userTimes.update({
      where: { id: Number(req.params.id) },
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
}

export async function remove(req, res, next) {
  try {
    await prisma.userTimes.delete({ where: { id: Number(req.params.id) } });
    return res.sendStatus(204);
  } catch (err) {
    console.error(err);
    next(err);
  }
}
