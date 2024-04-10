const EmailService = require('../utils/emailService')
const { CustomError } = require('../utils/error')

const sendEmail = async (req, res, next) => {
  try {
    const {
      emailTo,
      emailSubject,
      emailBody,
    } = req.body
    await EmailService
      .getInstance()
      .sendEmail(emailTo, emailSubject, emailBody)
    return res
      .status(200)
      .json({
        success: true,
        message: 'email sent successfully',
      })
  } catch (e) {
    let error = null
    if (e instanceof CustomError) {
      error = e
    } else {
      error = new CustomError(`Error sending email: ${e.message}`, 500, true)
    }
    next(error)
  }
}

module.exports = sendEmail
