import { Router } from 'express'
const router = Router()

import Location from '../../models/location.mjs'
import createNotification from './../notifications/create.mjs'

router.delete('/delete/:id', async (req, res) => {
    const locationDeleted = await Location.findByIdAndDelete(req.params.id)

    const notificationName = "Ubicación eliminada"
    const notificationDescription = `Ha sido eliminada una ubicación llamada ${locationDeleted.name}`
    const notificationIcon = "place"
    const notificationImportance = "medium"
    createNotification(notificationName, notificationDescription, notificationIcon, notificationImportance)

    res.status(200).json({ message: "Delete it correctly" })
  try {
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

export default router
