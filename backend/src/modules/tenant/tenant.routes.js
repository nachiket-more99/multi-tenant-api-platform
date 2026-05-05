import express from "express"
import { createTenant, getTenant, getAllUsers, updateTenant } from "./tenant.controller.js"

const router = express.Router()

router.post("/create", createTenant)
router.get("/:tenant_id", getTenant)
router.get("/:tenant_id/users", getAllUsers)
router.patch("/:tenant_id", updateTenant)

export default router