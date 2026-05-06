import express from "express"
import { getBooks } from "./books.controller.js"
import { validateApiKey } from "../../middlewares/validateApiKey.js"
import { rateLimiter } from "../../middlewares/rateLimiter.js"

const router = express.Router()

router.get("/all", validateApiKey, rateLimiter, getBooks);

export default router