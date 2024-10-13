import express from "express"
import dotenv from "dotenv"
dotenv.config()

import router from "./routes/notificationRoutes.js"

const app = express()
app.use(express.json())
const port = process.env.PORT || 3000

app.get("/", (req, res) => {
	res.json({ msg: "Welcome to this notifications mircoservie 📳" })
})

app.use("/api", router)

app.listen(port, () => {
	console.log(`Server is running on http://localhost:${port}`)
})
