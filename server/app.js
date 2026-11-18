import "dotenv/config";
import path from "node:path";
import express from "express";
import { sessionConfig } from "./config/passport.js";
import apiRoutes from "./routes/index.js";

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

if (!process.env.DATABASE_URL) throw new Error("DATABASE_URL not set");
if (!process.env.SECRET_KEY) throw new Error("SECRET_KEY not set");
if (!process.env.SALT_LENGTH) throw new Error("SALT_LENGTH not set");

sessionConfig(app);

app.use("/api", apiRoutes);

const dist = path.resolve("../client/dist");
app.use(express.static(dist));
app.get("/*splat", (_req, res) => res.sendFile(path.join(dist, "index.html")));

app.use((err, req, res, next) => {
  console.error(err);
  const status = err.status || 500;
  const message =
    process.env.NODE_ENV === "production" && status === 500
      ? "Internal server error."
      : err.message;
  res.status(status).json({ errors: [{ mesg: message }] });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, (errors) => {
  if (errors) {
    console.error(errors);
  }

  console.log(`Listening at port ${PORT}`);
});

export default app;
