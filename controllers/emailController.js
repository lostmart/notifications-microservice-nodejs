import { sendTestEmail } from "../services/emailService.js"

// Controller function to handle the email-sending request
export const sendEmail = async (req, res) => {
	const { recipient, subject, message, html, type } = req.body

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
		// Call the email service to send the email
		const info = await sendTestEmail(recipient, subject, message, html)

		// Return success response
		res.status(200).json({ message: "Email sent successfully", info })
	} catch (error) {
		// Handle errors and return failure response
		res
			.status(500)
			.json({ error: "Failed to send email", details: error.message })
	}
}
