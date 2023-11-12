import { Router } from 'express'
const router = Router()

import Administrator from '../../models/administrator.mjs'

router.post('/mark/:id', async (req, res) => {
  try {
    const administrator = await Administrator.findById(req.body.administrator)
    const idNotification = req.params.id

    if (!administrator) {
      return res.status(200).json({ message: 'User not founded' })
    }

    const currentNotification = administrator.notifications.findIndex(notification => notification._id == idNotification)
    administrator.notifications[currentNotification].status = "read"
    
    await Administrator.findByIdAndUpdate(administrator._id, administrator)
    res.status(200).json({ message: "Correctly done" })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

export default router
