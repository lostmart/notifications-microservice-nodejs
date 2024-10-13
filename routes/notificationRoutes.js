import express from "express"
const router = express.Router()

import { sendNotification } from "../controllers/notificationController.js"

router.post("/send-notification", (req, res) => {
	const { recipient, message, type } = req.body
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

	try {
		// sendNotification(recipient, message, type)
		// success response ✅
		sendNotification(req, res)
		res.status(200).json({
			msg: `Notification sent to ${recipient} successfully`,
			type,
			message,
		})
	} catch (error) {
		res.status(500).json({ error: error.message })
	}
})

export default router
