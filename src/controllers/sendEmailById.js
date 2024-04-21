const ServiceRegistryClient = require('../utils/serviceRegistry')
const EmailService = require('../utils/emailService')
const { CustomError } = require('../utils/error')
const axios = require('axios')

const sendEmailById = async (req, res, next) => {
  try {
    const {
      userId,
      subject,
      body,
    } = req.body

    if (
      !userId ||
      !subject ||
      !body
    ) {
      throw new CustomError('Missing required fields', 400, false)
    }

    const baseUrl = await ServiceRegistryClient
      .getInstance()
      .getUrl('User-Management')

    const url = new URL(`/api/get-email/${userId}`, baseUrl).toString()

    const result = await axios.get(url)

    const { email } = result.data

    await EmailService
      .getInstance()
      .sendEmail(email, subject, body)
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
    } else if (axios.isAxiosError(e) === true) {
      if (e.response) {
        error = new CustomError(e.response?.data?.message, e.response?.status, false)
      } else {
        error = new CustomError(`Axios Error: ${e.message}`, 500, true)
      }
    } else {
      error = new CustomError(`Error sending email: ${e.message}`, 500, true)
    }
    next(error)
  }
}

module.exports = sendEmailById
