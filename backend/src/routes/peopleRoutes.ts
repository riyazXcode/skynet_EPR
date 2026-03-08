import { Router } from "express"
import { getPeople } from "../controllers/peopleController"

const router = Router()

router.get("/", getPeople)

export default router