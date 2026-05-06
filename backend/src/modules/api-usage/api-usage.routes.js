import express from "express"
import { getApiUsage, getAllApiUsages } from "./api-usage.controller.js"
import { authMiddleware } from "../../middlewares/authMiddleware.js";

const router = express.Router()

router.get("/:api_key_id", authMiddleware, getApiUsage)
router.get("/", authMiddleware, getAllApiUsages)

export default router