import dotenv from "dotenv"
dotenv.config()

import nodemailer from "nodemailer" // For email notifications
// import twilio from "twilio" // For SMS notifications

const emailTransporter = nodemailer.createTestAccount((err, account) => {
	if (err) {
		console.error("Failed to create test account:", err)
		return
	}

	return nodemailer.createTransport({
		host: "smtp.ethereal.email",
		port: 587,
		secure: false, // true for 465, false for other ports
		auth: {
			user: account.user, // generated ethereal user
			pass: account.pass, // generated ethereal password
		},
	})
})

export const sendEmail = async (recipient, message) => {
	const mailOptions = {
		from: '"Notification Service" <notification@example.com>',
		to: recipient,
		subject: "Notification",
		text: message,
	}

	try {
		let info = await emailTransporter.sendMail(mailOptions)
		console.log(`Preview URL: ${nodemailer.getTestMessageUrl(info)}`)
	} catch (error) {
		console.error("Error sending email:", error)
		throw new Error("Failed to send email")
	}
}

// Example Push Notification (you could use Firebase or any other push service)
// import pushService from "some-push-notification-service" // Placeholder

// Setup for Twilio SMS Service (example)
// const twilioClient = twilio(
// 	process.env.TWILIO_ACCOUNT_SID,
// 	process.env.TWILIO_AUTH_TOKEN
// )

// Setup for Nodemailer Email Service (example)
// const emailTransporter = nodemailer.createTransport({
// 	service: "gmail",
// 	auth: {
// 		user: process.env.EMAIL_USER,
// 		pass: process.env.EMAIL_PASSWORD,
// 	},
// })
// console.log(process.env.EMAIL_USER)

// Function to send Email Notification
// export const sendEmail = async (recipient, message) => {
// 	console.log("trying to send email sendMail fn")

// 	const mailOptions = {
// 		from: process.env.EMAIL_USER,
// 		to: recipient,
// 		subject: "Notification",
// 		text: message,
// 	}

// 	try {
// 		let info = await emailTransporter.sendMail(mailOptions)
// 		console.log(`Email sent: ${info.response}`)
// 	} catch (error) {
// 		console.error("Error sending email:", error)
// 		throw new Error("Failed to send email")
// 	}
// }

// Function to send SMS Notification
// export const sendSMS = async (recipient, message) => {
// 	try {
// 		let smsResponse = await twilioClient.messages.create({
// 			body: message,
// 			from: process.env.TWILIO_PHONE_NUMBER, // Your Twilio phone number
// 			to: recipient, // Recipient phone number
// 		})
// 		console.log(`SMS sent: ${smsResponse.sid}`)
// 	} catch (error) {
// 		console.error("Error sending SMS:", error)
// 		throw new Error("Failed to send SMS")
// 	}
// }

// Function to send Push Notification
// export const sendPush = async (recipient, message) => {
// 	try {
// 		let pushResponse = await pushService.sendPush({
// 			to: recipient, // Push token or identifier
// 			title: "Notification",
// 			body: message,
// 		})
// 		console.log(`Push notification sent: ${pushResponse}`)
// 	} catch (error) {
// 		console.error("Error sending push notification:", error)
// 		throw new Error("Failed to send push notification")
// 	}
// }

// General function to handle notification based on type
export const sendNotificationService = async (recipient, message, type) => {
	switch (type) {
		case "email":
			await sendEmail(recipient, message)
			break
		case "sms":
			await sendSMS(recipient, message)
			break
		case "push":
			await sendPush(recipient, message)
			break
		default:
			throw new Error("Unsupported notification type")
	}
}
