import express from "express"
import { createUser, loginUser, getUser } from "./user.controller.js"
import { authMiddleware } from "../../middlewares/authMiddleware.js";

const router = express.Router()

router.post("/create", createUser)
router.post("/login", loginUser)
router.get("/me", authMiddleware, getUser)

export default router