import express from "express"
import { getBooks } from "./books.controllers"

const router = express.Router()

router.get("/books", getBooks)

export default router