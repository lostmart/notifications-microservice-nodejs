import {
	sendEmail,
	sendNotificationService,
} from "../services/notificationService.js"
// Import services here like sendEmail, sendSMS, sendPush, etc.

export const sendNotification = (req, res) => {
	const { recipient, message, type } = req.body

	// Validate required fields
	if (!recipient || !message || !type) {
		return res
			.status(400)
			.json({ error: "Recipient, message, and type are required" })
	}

	// Validate data types
	if (
		typeof recipient !== "string" ||
		typeof message !== "string" ||
		typeof type !== "string"
	) {
		return res
			.status(400)
			.json({ error: "Invalid data sent to the notification service" })
	}

	// Validate notification type
	const validTypes = ["email", "sms", "push"]
	if (!validTypes.includes(type)) {
		return res.status(400).json({
			error: "Invalid notification type: only sms, email or push allowed!",
		})
	}

	// Process notification (this would call services or business logic)
	try {
		// You will later integrate actual notification logic here
		// e.g., sendNotificationService(recipient, message, type);

		sendNotificationService(recipient, message, type)

		// Success response ✅
		sendEmail(recipient, message)
		// res.status(200).json({
		// 	msg: `Notification sent to ${recipient} successfully`,
		// 	type,
		// 	message,
		// })
	} catch (error) {
		// Handle errors
		res.status(500).json({ error: error.message })
	}
}
