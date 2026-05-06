import express from "express"
import { getAllLogs } from "./request-log.controller.js"
import { authMiddleware } from "../../middlewares/authMiddleware.js";

const router = express.Router()

router.get("/all/:api_key_id", authMiddleware, getAllLogs)

export default router