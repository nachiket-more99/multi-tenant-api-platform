import express from "express"
import { createTenant, addUser, getTenant, getAllUsers, updateTenant } from "./tenant.controller.js"
import { authMiddleware } from "../../middlewares/authMiddleware.js";

const router = express.Router()

router.post("/create", authMiddleware, createTenant)
router.post("/add-user", authMiddleware, addUser)
router.get("/me", authMiddleware, getTenant)
router.get("/users", authMiddleware, getAllUsers)
router.patch("/", authMiddleware, updateTenant)

export default router