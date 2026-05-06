import express from "express"
import { getApiUsage, getAllApiUsages } from "./api-usage.controller.js"
import { authMiddleware } from "../../middlewares/auth.middleware.js";

const router = express.Router()

router.get("/:api_usage_id", authMiddleware, getApiUsage)
router.get("/:tenant_id", authMiddleware, getAllApiUsages)

export default router