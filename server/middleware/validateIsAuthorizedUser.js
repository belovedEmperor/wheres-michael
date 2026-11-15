import { prisma } from "../lib/prisma.js";

export default async function validateTimeIsUsers(req, res, next) {
  const time = await prisma.userTimes.findUnique({
    where: { id: Number(req.params.id) },
  });
  req.time = time;
  return req.user.id === time.userId ? next() : res.sendStatus(401);
}
