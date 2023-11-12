import { Router } from 'express'
const router = Router()

import Administrator from '../../models/administrator.mjs'

async function createNotification (pName, pDescription, pIcon, pImportance) {
  const newNotification = {
    _id: Date.now(),
    name: pName,
    description: pDescription,
    icon: pIcon,
    importance: pImportance,
    status: 'unread',
    created_at: new Date()
  }
  const administrators = await Administrator.find()

  for (const singleAdministrator of administrators) {
    const administrator = await Administrator.findById(singleAdministrator._id)
    if (!administrator.notifications) {
      administrator.notifications = [newNotification]
    } else {
      if (
        administrator.notifications.findIndex(
          notification => notification._id === newNotification._id
        ) === -1
      ) {
        administrator.notifications.push(newNotification)
      }
    }
    await administrator.save()
  }
}

export default createNotification
