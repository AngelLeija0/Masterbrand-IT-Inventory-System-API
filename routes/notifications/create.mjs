import { Router } from 'express'
const router = Router()

import Notification from '../../models/notification.mjs'

async function createNotification(pName, pDescription, pIcon, pImportance) {
    const newNotification = {
        name: pName,
        description: pDescription,
        icon: pIcon,
        importance: pImportance,
        status: "unread",
        created_at: new Date(),
    }
    
    const notification = new Notification(newNotification)
    const notificationAdded = await notification.save()

    return notificationAdded
}

export default createNotification