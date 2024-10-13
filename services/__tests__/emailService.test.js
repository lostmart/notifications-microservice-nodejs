const nodemailer = require("nodemailer")
const { sendTestEmail } = require("../emailService.js")

jest.mock("nodemailer")

describe("Email Service", () => {
	let mockSendMail
	let mockCreateTestAccount

	beforeAll(() => {
		// Mock nodemailer.createTestAccount
		mockCreateTestAccount = jest.fn().mockResolvedValue({
			user: "test-user@example.com",
			pass: "test-pass",
		})
		nodemailer.createTestAccount = mockCreateTestAccount

		// Mock nodemailer transporter and sendMail method
		mockSendMail = jest
			.fn()
			.mockResolvedValue({ messageId: "test-id", response: "Email sent" })
		nodemailer.createTransport.mockReturnValue({ sendMail: mockSendMail })
	})

	it("should send an email successfully", async () => {
		const to = "test@example.com"
		const subject = "Test Subject"
		const text = "Test email body"
		const html = "<p>Test email body</p>"

		const result = await sendTestEmail(to, subject, text, html)

		// Check that sendMail was called with correct arguments
		expect(mockSendMail).toHaveBeenCalledWith({
			from: '"Fake Sender" <fake@example.com>',
			to,
			subject,
			text,
			html,
		})

		// Check that result contains the correct messageId
		expect(result.messageId).toEqual("test-id")
	})

	// Uncomment this to test error handling
	it("should throw an error if email sending fails", async () => {
		// Mock failure of sendMail
		mockSendMail.mockRejectedValueOnce(new Error("Failed to send email"))

		const to = "test@example.com"
		const subject = "Test Subject"
		const text = "Test email body"
		const html = "<p>Test email body</p>"

		await expect(sendTestEmail(to, subject, text, html)).rejects.toThrow(
			"Failed to send email"
		)
	})
})
