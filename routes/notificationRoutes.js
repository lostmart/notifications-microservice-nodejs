import express from "express"
import { sendEmail } from "../controllers/emailController.js"
const router = express.Router()

router.post("/send-notification", (req, res) => {
	const { recipient, message, subject, type } = req.body
	//sendNotification(recipient, message, type)

	// Check empty
	if (!recipient || !message || !type) {
		return res
			.status(400)
			.json({ error: "Recipient, message, and type are required" })
	}
	// Check type
	if (
		typeof recipient !== "string" ||
		typeof message !== "string" ||
		typeof type !== "string"
	) {
		return res
			.status(400)
			.json({ error: "Invalid data sent to the notification service" })
	}
	const validationType = ["email", "sms", "push"]
	if (!validationType.includes(type)) {
		return res.status(400).json({
			error: "Invalid notification type: only sms, email or push allowed !",
		})
	}
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
