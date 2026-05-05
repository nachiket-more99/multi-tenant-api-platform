import express from "express"
import { createUser, loginUser, getUser } from "./user.controller.js"

const router = express.Router()

router.post("/create", createUser)
router.post("/login", loginUser)
router.get("/:user_id", getUser)

export default router