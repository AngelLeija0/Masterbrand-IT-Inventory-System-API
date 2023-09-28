import { Router } from 'express'
const router = Router()

import Notification from '../../models/notification.mjs'

router.get('/', async (req, res) => {
  try {
    const notifications = await Notification.find()
    res.status(200).json(notifications)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

export default router
