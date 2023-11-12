import { Router } from 'express'
const router = Router()

import Notification from '../../models/notification.mjs'

router.get('/unreaded', async (req, res) => {
  try {
    const notifications = await Notification.find({ status: "unread" }).sort({ created_at: -1 })
    res.status(200).json(notifications)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

export default router
