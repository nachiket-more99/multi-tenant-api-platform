import express from "express"
import { getBooks } from "./books.controller.js"
import { validateApiKey } from "../../middlewares/validateApiKey.js"

const router = express.Router()

router.get("/all", validateApiKey, getBooks);

export default router