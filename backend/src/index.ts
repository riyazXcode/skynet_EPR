import express from "express"
import cors from "cors"

import peopleRoutes from "./routes/peopleRoutes"
import eprRoutes from "./routes/eprRoutes"
import { errorHandler } from "./middleware/errorHandler"

const app = express()

app.use(cors())
app.use(express.json())

app.use("/api/people", peopleRoutes)
app.use("/api/epr", eprRoutes)
app.use(errorHandler)

app.listen(5000, () => {
 console.log("Server running on port 5000")
})
