import { Router } from 'express'
const router = Router()

import Notification from '../../models/notification.mjs'
import { validateNotification } from '../../schemas/notification.mjs'

router.post('/create', async (req, res) => {
  try {
    const notificationInfo = req.body
    if (!notificationInfo) {
      return res.status(400).json({ message: 'Data no found it' })
    }

    const validateInfo = validateNotification(notificationInfo)
    if (validateInfo.error) {
      return res.status(400).json({ message: validateInfo.error.message })
    }
    const newNotification = new Notification(validateInfo.data)
    const notificationAdded = await newNotification.save()
    res.status(201).json(notificationAdded)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

export default router
