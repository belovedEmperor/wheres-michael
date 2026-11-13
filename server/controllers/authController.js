import bcrypt from "bcryptjs";
import { prisma } from "../lib/prisma.js";
import passport from "passport";

export async function register(req, res, next) {
  try {
    const hashedPassword = await bcrypt.hash(
      req.body.password,
      Number(process.env.SALT_LENGTH),
    );

    const user = await prisma.user.create({
      data: {
        email: req.body.email.trim().toLowerCase(),
        password: hashedPassword,
      },
      omit: { password: true },
    });

    return req.login(user, (err) => {
      if (err) return next(err);
      res.status(201).json(user);
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
}

export function login(req, res, next) {
  passport.authenticate("local", (err, user, info) => {
    if (err) return next(err);
    if (!user)
      return res
        .status(401)
        .json({ message: info?.message || "Incorrect email or password." });
    req.login(user, (err) => {
      if (err) return next(err);
      res.json({ id: user.id, email: user.email });
    });
  })(req, res, next);
}

export function logout(req, res, next) {
  req.logout((err) => {
    if (err) return next(err);
    res.sendStatus(204);
  });
}

export async function get(req, res, next) {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      omit: { password: true },
    });
    res.json(user);
  } catch (err) {
    console.error(err);
    next(err);
  }
}

export async function update(req, res, next) {
  try {
    const user = await prisma.user.update({
      where: { id: req.user.id },
      omit: { password: true },
    });
    res.json(user);
  } catch (err) {
    console.error(err);
    next(err);
  }
}

export async function remove(req, res, next) {
  try {
    await prisma.user.delete({ where: { id: req.user.id } });
    res.sendStatus(204);
  } catch (err) {
    console.error(err);
    next(err);
  }
}
