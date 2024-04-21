const Notification = require('../models/Notification')

const getNotifications = async (req, res, next) => {
  try {
    const userId = req.get('X-User-Id')

    const results = await Notification.find({
      userId,
      viewed: false,
    })

    return res
      .status(200)
      .json({
        success: true,
        message: 'Notifications retrieved successfully',
        data: results,
      })
  } catch (error) {
    next(error)
  }
}

module.exports = getNotifications
