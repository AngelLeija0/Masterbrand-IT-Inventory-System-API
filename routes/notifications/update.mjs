import { Router } from 'express'
const router = Router()

import Notification from '../../models/notification.mjs'
import { validatePartialNotification } from '../../schemas/notification.mjs'

router.patch('/update/:id', async (req, res) => {
  try {
    const notificationInfo = req.body
    if (!notificationInfo) {
      return res.status(400).json({ message: "Data no found it" })
    }

    const validateInfo = validatePartialNotification(notificationInfo)
    if (validateInfo.error) {
      return res.status(400).json({ message: validateInfo.error.message })
    }

    const notification = await Notification.findById(req.params.id)
    if (!notification){
      return res.status(404).json({ message: "Category not found" })
    }

    notification.set(validateInfo.data)
    notification.updated_at = new Date()

    const notificationUpdated = await notification.save()
    res.status(200).json(notificationUpdated)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

export default router
