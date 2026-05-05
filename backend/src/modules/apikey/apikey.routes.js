import express from "express"
import { createApiKey, getApiKey, getAllApiKeys, deleteApiKey } from "./apikey.controller.js"
import { authMiddleware } from "../../middlewares/auth.middleware.js";

const router = express.Router()

router.post("/create", authMiddleware, createApiKey)
router.get("/:api_key_id", authMiddleware, getApiKey)
router.get("/:tenant_id/apis", authMiddleware, getAllApiKeys)
router.delete("/:api_key_id", authMiddleware, deleteApiKey)

export default router