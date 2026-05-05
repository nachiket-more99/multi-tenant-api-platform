import express from "express"
import { createApiKey, getApiKey, getAllApiKeys, deleteApiKey } from "./apikey.controller.js"

const router = express.Router()

router.post("/create", createApiKey)
router.get("/:api_key_id", getApiKey)
router.get("/:tenant_id/apis", getAllApiKeys)
router.delete("/:api_key_id", deleteApiKey)

export default router