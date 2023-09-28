import { Router } from 'express'
const router = Router()

import Notification from '../../models/notification.mjs'

router.get('/:id', async (req, res) => {
  try {
    const notification = await Notification.findById(req.params.id)
    res.status(200).json(notification)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

export default router
