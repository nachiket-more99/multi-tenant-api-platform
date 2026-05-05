import express from "express"
import { createUser, getUser } from "./user.controller.js"

const router = express.Router()

router.post("/create", createUser)
router.get("/:user_id", getUser)

export default router