import expressSession from "express-session";
import { PrismaSessionStore } from "@quixo3/prisma-session-store";
const sessionConfig = (app) => {
  app.use(
    expressSession({
      cookie: {
        maxAge: 14 * 24 * 60 * 60 * 1000, // ms
      },
      secret: process.env.SECRET_KEY,
      resave: false,
      saveUninitialized: false,
      store: new PrismaSessionStore(prisma, {
        checkPeriod: 2 * 60 * 1000, //ms
        dbRecordIdIsSessionId: true,
        dbRecordIdFunction: undefined,
      }),
    }),
  );
  app.use(passport.session());
};

import { prisma } from "../lib/prisma.js";
import passport from "passport";
import bcrypt from "bcryptjs";
import passportLocal from "passport-local";
const LocalStrategy = passportLocal.Strategy;
passport.use(
  new LocalStrategy(
    { usernameField: "email" },
    async (email, password, done) => {
      try {
        const user = await prisma.user.findUnique({
          where: { email: email.toLowerCase() },
        });

        if (!user) {
          return done(null, false, { message: "Incorrect email or password." });
        }

        const match = await bcrypt.compare(password, user.password);
        if (!match) {
          return done(null, false, { message: "Incorrect email or password." });
        }

        return done(null, user);
      } catch (err) {
        return done(err);
      }
    },
  ),
);
passport.serializeUser((user, done) => {
  done(null, user.id);
});
passport.deserializeUser(async (id, done) => {
  try {
    done(
      null,
      await prisma.user.findUnique({
        where: { id },
      }),
    );
  } catch (err) {
    done(err);
  }
});

export { sessionConfig };
