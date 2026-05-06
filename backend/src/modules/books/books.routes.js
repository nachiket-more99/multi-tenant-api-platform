import express from "express"
import { getBooks } from "./books.controller.js"
import { validateApiKey } from "../../middlewares/validateApiKey.js"
import { rateLimiter } from "../../middlewares/rateLimiter.js"
import { logMiddleware } from "../../middlewares/logMiddleware.js"
import { apiUsageMiddleware } from "../../middlewares/apiUsageMiddleware.js"

const router = express.Router()

router.get("/all", validateApiKey, rateLimiter, logMiddleware, apiUsageMiddleware, getBooks);

export default router