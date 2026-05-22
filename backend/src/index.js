import express from "express";
import prisma from "./lib/prisma.js";
import redis from "./lib/redis.js";
import authRouter from "./modules/auth/auth.routes.js";
import userRouter from "./modules/user/user.routes.js";
import tenantRouter from "./modules/tenant/tenant.routes.js";
import apiKeyRouter from "./modules/api-key/api-key.routes.js";
import requestLogRouter from "./modules/request-log/request-log.routes.js";
import apiUsageRouter from "./modules/api-usage/api-usage.routes.js";
import booksRouter from "./modules/books/books.routes.js";
import './worker/worker.js';
import './jobs/scheduler.js';
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());

app.get("/", async (req, res) => {
  const health = {
    status: "ok",
    postgres: "disconnected",
    redis: "disconnected",
    timestamp: new Date().toISOString(),
  };

  try {
    await prisma.$queryRaw`SELECT 1`;
    health.postgres = "connected";
  } catch (err) {
    health.status = "error";
  }

  try {
    await redis.ping();
    health.redis = "connected";
  } catch (err) {
    health.status = "error";
  }

  const statusCode = health.status === "ok" ? 200 : 500;

  res.status(statusCode).json(health);
});

app.use("/auth", authRouter);
app.use("/user", userRouter);
app.use("/tenant", tenantRouter);
app.use("/api-key", apiKeyRouter);
app.use("/logs", requestLogRouter);
app.use("/usage", apiUsageRouter);


app.use("/books", booksRouter);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});