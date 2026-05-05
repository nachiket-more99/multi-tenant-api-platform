import express from "express"
import { createTenant, addUser, getTenant, getAllUsers, updateTenant } from "./tenant.controller.js"
import { authMiddleware } from "../../middlewares/auth.middleware.js";

const router = express.Router()

router.post("/create", authMiddleware, createTenant)
router.post("/add-user", authMiddleware, addUser)
router.get("/:tenant_id", authMiddleware, getTenant)
router.get("/:tenant_id/users", authMiddleware, getAllUsers)
router.patch("/:tenant_id", authMiddleware, updateTenant)

export default router