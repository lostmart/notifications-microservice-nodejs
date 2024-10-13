import nodemailer from "nodemailer"

// Function to send emails
export const sendTestEmail = async (recipient, subject, message, html) => {
	try {
		// Generate test SMTP service account from ethereal.email
		const account = await nodemailer.createTestAccount()

		// Create a transporter object using the default SMTP transport
		const transporter = nodemailer.createTransport({
			host: "smtp.ethereal.email",
			port: 587,
			secure: false, // true for 465, false for other ports
			auth: {
				user: account.user, // generated ethereal user
				pass: account.pass, // generated ethereal password
			},
		})

		// Set up email data
		const mailOptions = {
			from: '"Fake Sender" <fake@example.com>', // sender address
			to: recipient, // list of receivers
			subject: subject, // subject line
			text: message, // plain text body
			html: html, // html body
		}

		// Send the email
		const info = await transporter.sendMail(mailOptions)

		// Log message and preview URL
		console.log("Message sent: %s", info.messageId)
		console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info))

		return info
	} catch (error) {
		console.error("Error occurred:", error.message)
		throw error
	}
}
