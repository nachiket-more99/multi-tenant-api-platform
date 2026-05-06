import express from "express"
import { createLog, getAllLogs } from "./request-log.controller.js"
import { authMiddleware } from "../../middlewares/auth.middleware.js";

const router = express.Router()

router.post("/create", authMiddleware, createLog)
router.get("/all/:api_key_id", authMiddleware, getAllLogs)

export default router