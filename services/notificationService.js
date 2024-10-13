/**
 *
 * @param {string} recipient: Name of the recipient
 * @param {string} message: Body of the message
 * @param {string} type: only three types allowed "email", "sms", "push"
 */
export const sendNotification = (recipient, message, type) => {
	const { recipient, message, type } = req.body

	try {
		sendNotification(recipient, message, type)
		res.status(200).json({ msg: "Notification sent successfully" })
	} catch (error) {
		res.status(500).json({ error: error.message })
	}

	checkType = () => {
		switch (type) {
			case "email":
				// Send email using a service like SendGrid or Nodemailer
				break
			case "sms":
				// Send SMS using a service like Twilio
				break
			case "push":
				// Send push notification using Firebase Cloud Messaging (FCM) or similar
				break
			default:
				throw new Error("Invalid notification type")
		}
	}
}
