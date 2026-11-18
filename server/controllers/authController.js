import bcrypt from "bcryptjs";
import { prisma } from "../lib/prisma.js";
import passport from "passport";
import { body, validationResult, matchedData } from "express-validator";

const emptyErr = "must not be empty.";
const alphaErr = "must be alphabetical.";
const whitespaceErr = "must not contain whitespace.";
const passwordLengthErr = "must be between or equal to 8 and 25 characters.";

const whitespaceValidator = (value) => {
  return value.includes(" ") ? false : true;
};

async function checkNoExistingUsername(value) {
  const user = await prisma.user.findUnique({ where: { username: value } });
  if (user) throw new Error("Username already in use.");
}

async function checkNoExistingEmail(value) {
  const user = await prisma.user.findUnique({ where: { email: value } });
  if (user) throw new Error("Email already in use.");
}

const validateLoginInfo = [
  body("email")
    .trim()
    .toLowerCase()
    .notEmpty()
    .withMessage(`Email ${emptyErr}`)
    .custom(whitespaceValidator)
    .withMessage(`Email ${whitespaceErr}`)
    .isEmail()
    .withMessage(`Email must be valid.`),
  body("password")
    .trim()
    .notEmpty()
    .withMessage(`Password ${emptyErr}`)
    .isLength({ min: 8, max: 25 })
    .withMessage(`Password ${passwordLengthErr}`)
    .custom(whitespaceValidator)
    .withMessage(`Password ${whitespaceErr}`)
    .isStrongPassword({ minLowercase: 1, minUppercase: 1 })
    .withMessage(
      `Password must have at least 1 lowercase and 1 uppercase letter.`,
    )
    .isStrongPassword({ minNumbers: 1 })
    .withMessage(`Password must have at least 1 number.`)
    .isStrongPassword({ minSymbols: 1 })
    .withMessage(`Password must have at least 1 symbol.`),
];

const validateAccountInfo = [
  ...validateLoginInfo,
  body("username")
    .trim()
    .notEmpty()
    .withMessage(`Username ${emptyErr}`)
    .isAlpha()
    .withMessage(`Username ${alphaErr}`)
    .custom(checkNoExistingUsername)
    .withMessage("Username already in use."),
];

const validateUpdateInfo = [
  body("email")
    .optional({ checkFalsy: true })
    .trim()
    .toLowerCase()
    .isEmail()
    .withMessage("Email must be valid."),
  body("password")
    .optional({ checkFalsy: true })
    .isLength({ min: 8, max: 25 })
    .withMessage(`Password ${passwordLengthErr}`)
    .custom(whitespaceValidator)
    .withMessage(`Password ${whitespaceErr}`),
  body("username")
    .optional({ checkFalsy: true })
    .trim()
    .isAlpha()
    .withMessage(`Username ${alphaErr}`)
    .custom(checkNoExistingUsername)
    .withMessage("Username already in use."),
];

const validateRegisterInfo = [
  ...validateAccountInfo,
  body("email")
    .trim()
    .toLowerCase()
    .custom(checkNoExistingEmail)
    .withMessage("Email already in use."),
  body("confirmPassword")
    .trim()
    .notEmpty()
    .withMessage(`Password confirmation ${emptyErr}`)
    .custom(whitespaceValidator)
    .withMessage(`Password confirmation ${whitespaceErr}`)
    .custom((value, { req }) => {
      return value === req.body.password;
    })
    .withMessage(`Password confirmation must match password.`),
];

export const register = [
  validateRegisterInfo,
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { username, email, password } = matchedData(req);
      const hashedPassword = await bcrypt.hash(
        password,
        Number(process.env.SALT_LENGTH),
      );

      const data = {
        username: username.trim(),
        email: email.trim().toLowerCase(),
        password: hashedPassword,
      };

      const user = await prisma.user.create({ data, omit: { password: true } });

      return req.login(user, (err) => {
        if (err) return next(err);
        res.status(201).json(user);
      });
    } catch (err) {
      if (err.code === "P2002") {
        const field = err.meta?.target?.[0] ?? "email";
        return res.status(409).json({
          errors: [{ msg: `${field} already in use.`, path: field }],
        });
      }
      console.error(err);
      next(err);
    }
  },
];

export const login = [
  validateLoginInfo,
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    passport.authenticate("local", (err, user, info) => {
      if (err) return next(err);
      if (!user)
        return res
          .status(401)
          .json({ message: info?.message || "Incorrect email or password." });
      req.login(user, (err) => {
        if (err) return next(err);
        res.json({ id: user.id, email: user.email, username: user.username });
      });
    })(req, res, next);
  },
];

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

export const update = [
  validateUpdateInfo,
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { username, email, password } = matchedData(req);
      const data = {};
      if (username) data.username = username;
      if (email) data.email = email;
      if (password)
        data.password = await bcrypt.hash(
          password,
          Number(process.env.SALT_LENGTH),
        );

      const user = await prisma.user.update({
        where: { id: req.user.id },
        data,
        omit: { password: true },
      });
      res.json(user);
    } catch (err) {
      if (err.code === "P2002") {
        const field = err.meta?.target?.[0] ?? "email";
        return res.status(409).json({
          errors: [{ msg: `${field} already in use.`, path: field }],
        });
      }
      console.error(err);
      next(err);
    }
  },
];

export async function remove(req, res, next) {
  try {
    await prisma.user.delete({ where: { id: req.user.id } });
    res.sendStatus(204);
  } catch (err) {
    console.error(err);
    next(err);
  }
}
