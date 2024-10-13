import { sendTestEmail } from "../services/emailService.js"

// Controller function to handle the email-sending request
export const sendEmail = async (req, res) => {
	const { recipient, subject, message, html } = req.body

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
