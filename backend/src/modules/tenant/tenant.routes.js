import express from "express"
import { createTenant, addUser, getTenant, getAllUsers, updateTenant } from "./tenant.controller.js"

const router = express.Router()

router.post("/create", createTenant)
router.post("/add-user", addUser)
router.get("/:tenant_id", getTenant)
router.get("/:tenant_id/users", getAllUsers)
router.patch("/:tenant_id", updateTenant)

export default router