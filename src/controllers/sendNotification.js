const Notification = require('../models/Notification')
const { CustomError } = require('../utils/error')

const sendNotification = async (req, res, next) => {
  try {
    const {
      userId,
      title,
      info
    } = req.body

    if (
      !userId ||
      !title
    ) {
      throw new CustomError('Required fields missing', 400, false)
    }

    console.log(userId, title, info)

    const notification = new Notification({
      userId,
      title,
      info,
      viewed: false,
      timeStamp: new Date(),
    })

    await notification.save()

    return res
      .status(200)
      .json({
        success: true,
        message: 'Notification sent',
      })
  } catch (e) {
    next(e)
  }
}

module.exports = sendNotification
