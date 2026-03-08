import { Router } from "express"
import {
 listEprs,
 getEpr,
 createEprRecord,
 updateEprRecord
} from "../controllers/eprController"

const router = Router()

router.get("/", listEprs)

router.get("/:id", getEpr)

router.post("/", createEprRecord)

router.patch("/:id", updateEprRecord)

export default router