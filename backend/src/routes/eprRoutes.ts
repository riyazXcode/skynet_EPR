import { Router } from "express"
import {
 listEprs,
 getEpr,
 createEprRecord,
 updateEprRecord,
 getEprSummary,
 generateEprRemarks
} from "../controllers/eprController"

const router = Router()

router.post("/assist", generateEprRemarks)

router.get("/summary/:personId", getEprSummary)

router.get("/", listEprs)

router.get("/:id", getEpr)

router.post("/", createEprRecord)

router.patch("/:id", updateEprRecord)

export default router