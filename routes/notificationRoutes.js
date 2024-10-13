import express from "express"
import { sendEmail } from "../controllers/emailController.js"
const router = express.Router()

router.post("/send-notification", (req, res) => {
	sendEmail(req, res)

	// try {

	// 	res.status(200).json({
	// 		msg: `Notification sent to ${recipient} successfully`,
	// 		type,
	// 		message,
	// 	})
	// } catch (error) {
	// 	res.status(500).json({ error: error.message })
	// }
})

export default router
