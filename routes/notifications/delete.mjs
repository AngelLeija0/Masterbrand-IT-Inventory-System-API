import { Router } from 'express'
const router = Router()

import Notification from '../../models/notification.mjs'

router.delete('/delete/:id', async (req, res) => {
  await Notification.findByIdAndDelete(req.params.id)
  res.status(200)
  try {
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

export default router
