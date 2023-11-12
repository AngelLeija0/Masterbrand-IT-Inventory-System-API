import { Router } from 'express'
const router = Router()

import Notification from '../../models/notification.mjs'

router.get('/mark/:id', async (req, res) => {
  try {
    const idNotification = req.params.id
    const notification = await Notification.findById(idNotification)

    if (!notification) {
      return res.status(200).json({ message: "Notification no founded" })
    }

    notification.status = "readed"
    const notificationUpdated = await notification.save()
    res.status(200).json(notificationUpdated)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

export default router
