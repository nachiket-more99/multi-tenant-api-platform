import express from "express"
import { getApiUsage, getAllApiUsages, getUsageSummary, getUsageChart, getEndpointUsage, getUsageByKey } from "./api-usage.controller.js"
import { authMiddleware } from "../../middlewares/authMiddleware.js";

const router = express.Router()

router.get("/summary", authMiddleware, getUsageSummary)
router.get("/summary/:api_key_id", authMiddleware, getUsageSummary)

router.get("/chart", authMiddleware, getUsageChart)
router.get("/chart/:api_key_id", authMiddleware, getUsageChart)

router.get("/endpoints", authMiddleware, getEndpointUsage)
router.get("/endpoints/:api_key_id", authMiddleware, getEndpointUsage)

router.get("/by-key", authMiddleware, getUsageByKey)

router.get("/", authMiddleware, getAllApiUsages)
router.get("/:api_key_id", authMiddleware, getApiUsage)

export default router