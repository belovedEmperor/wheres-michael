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
  try {
    const { userId, imageId, sort, limit, offset } = req.query;

    let query = 'SELECT * FROM "UserTimes"';

    let whereArray = [];
    userId && whereArray.push(`userId = ${userId}`);
    imageId && whereArray.push(`imageId = ${imageId}`);
    if (whereArray.length > 0) {
      query += ` WHERE ${whereArray.join(" AND ")}`;
    }

    let orderBy = "";
    if (sort) {
      switch (sort.toLowerCase()) {
        case "descending":
          orderBy = "DESC";
          break;
        case "ascending":
          orderBy = "ASC";
          break;
        default:
          break;
      }
    }
    if (orderBy != "")
      query += ` ORDER BY ("endTime" - "startTime") ${orderBy} NULLS LAST`;

    let pagination = "";
    limit ? (pagination += `LIMIT ${limit}`) : (pagination += "LIMIT 20");
    offset ? (pagination += ` OFFSET ${offset}`) : (pagination += " OFFSET 0");
    query += ` ${pagination}`;

    const times = await prisma.$queryRaw`${query}`;
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

async function checkGuess(id, x, y) {
  const image = await prisma.image.findUnique({ where: { id: id } });
  if (
    image.boxCornerOneX <= x <= image.boxCornerTwoX &&
    image.boxCornerOneY <= y <= image.boxCornerTwoY
  )
    return true;
  else return false;
}

export async function update(req, res, next) {
  try {
    const { guessX, guessY } = req.body;
    if (!guessX || !guessY) throw new Error("Guess coordinates not found.");
    if (!(await checkGuess(Number(req.params.id), guessX, guessY)))
      return res.json({ message: "Wrong guess" });

    const time = await prisma.userTimes.update({
      where: { id: Number(req.params.id) },
      data: {
        endTime: new Date(),
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
