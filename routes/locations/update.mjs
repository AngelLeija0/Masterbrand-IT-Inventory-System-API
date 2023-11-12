import { Router } from 'express'
const router = Router()

import Location from '../../models/location.mjs'
import { validatePartialLocation } from '../../schemas/location.mjs'
import createNotification from './../notifications/create.mjs'

router.patch('/update/:id', async (req, res) => {
  try {
    const locationInfo = req.body
    if (!locationInfo) {
      return res.status(400).json({ message: "Data no found it" })
    }

    const validateInfo = validatePartialLocation(locationInfo)
    if (validateInfo.error) {
      return res.status(400).json({ message: validateInfo.error.message })
    }

    const location = await Location.findById(req.params.id)
    if (!location) {
      return res.status(404).json({ message: "Category not found" })
    }

    location.set(validateInfo.data)
    location.updated_at = new Date()

    const locationUpdated = await location.save()

    const notificationName = "Ubicación editada"
    const notificationDescription = `Ha sido editada una ubicación llamada ${locationUpdated.name}`
    const notificationIcon = "place"
    const notificationImportance = "normal"
    createNotification(notificationName, notificationDescription, notificationIcon, notificationImportance)

    res.status(200).json(locationUpdated)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

export default router
