import express from "express"
import { getAllLogs, getAllApiLogs } from "./request-log.controller.js"
import { authMiddleware } from "../../middlewares/authMiddleware.js";

const router = express.Router()

router.get("/all", authMiddleware, getAllLogs)
router.get("/all/:api_key_id", authMiddleware, getAllApiLogs)

export default router