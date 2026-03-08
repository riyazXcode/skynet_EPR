import { Router } from "express"
import {
    listEprs,
    getEpr,
    createEprRecord,
    updateEprRecord,
    getEprSummary,
    generateEprRemarks
} from "../controllers/eprController"
import { mockAuth, requireRole } from "../middleware/authMiddleware"


const router = Router()

router.post("/assist", generateEprRemarks)

router.get("/summary/:personId", mockAuth, getEprSummary)

router.get(
    "/",
    mockAuth,
    listEprs
)

router.get("/:id", mockAuth, getEpr)

router.post(
    "/",
    mockAuth,
    requireRole(["instructor", "admin"]),
    createEprRecord
)

router.patch("/:id", mockAuth, updateEprRecord)

export default router
