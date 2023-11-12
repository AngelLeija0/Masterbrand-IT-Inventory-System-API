import { Router } from 'express'
const router = Router()

import Administrator from '../../models/administrator.mjs'

router.get('/unreaded/:idUser', async (req, res) => {
  try {
    const administrator = await Administrator.findById(req.params.idUser)

    if (!administrator) {
      return res.status(200).json({ message: 'User not founded' })
    }

    const notifications = administrator.notifications
    const unreadedNotifications = []

    notifications.map(notification => {
      if (notification.status === 'unread') {
        unreadedNotifications.push(notification)
      }
    })

    unreadedNotifications.sort(function (a, b) {
      return b.created_at - a.created_at
    })

    res.status(200).json(unreadedNotifications)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

export default router
