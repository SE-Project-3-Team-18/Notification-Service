const Notification = require('../models/Notification')
const { CustomError } = require('../utils/error')

const readNotifications = async (req, res, next) => {
  try {
    const userId = req.get('X-User-Id')
    const { notificationId } = req.body

    const result = await Notification.updateOne(
      {
        userId,
        _id: notificationId,
      },
      {
        $set: {
          viewed: true,
        },
      }
    )

    if (result.matchedCount > 1) {
      throw new CustomError('Multiple notifications with same id', 500, true)
    } else if (result.matchedCount === 0) {
      throw new CustomError('No notification found', 400, false)
    }

    return res
      .status(200)
      .json({
        success: true,
        message: 'Notifications read successfully',
      })
  } catch (error) {
    next(error)
  }
}

module.exports = readNotifications
