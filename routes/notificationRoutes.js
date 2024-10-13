import express from "express"
import { sendNotification } from "../services/notificationService.js"
const router = express.Router()

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
	// switch (type) {
	// 	case "email":
	// 		// Send email using a service like SendGrid or Nodemailer
	// 		break
	// 	case "sms":
	// 		// Send SMS using a service like Twilio
	// 		break
	// 	case "push":
	// 		// Send push notification using Firebase Cloud Messaging (FCM) or similar
	// 		break
	// 	default:
	// 		return res.status(400).json({
	// 			error: "Invalid notification type: only sms, email or push allowed !",
	// 		})
	// }

	try {
		// sendNotification(recipient, message, type)
		res.status(200).json({
			msg: `Notification sent to ${recipient} successfully`,
			type,
			message,
		})
	} catch (error) {
		res.status(500).json({ error: error.message })
	}

	// Placeholder logic for sending notifications (to be implemented)
	// You could send notifications via email, SMS, or push notifications
	res.status(200).json({
		msg: `Notification sent to ${recipient} with message: "${message}" via ${type}`,
	})
})

export default router
