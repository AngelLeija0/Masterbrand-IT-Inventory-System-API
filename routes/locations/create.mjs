import { Router } from 'express'
const router = Router()

import Location from '../../models/location.mjs'
import { validateLocation } from '../../schemas/location.mjs'

router.post('/create', async (req, res) => {
  try {
    const locationInfo = req.body
    if (!locationInfo) {
      return res.status(400).json({ message: "Data no found it" })
    }

    const validateInfo = validateLocation(locationInfo)
    if (validateInfo.error) {
      return res.status(400).json({ message: validateInfo.error.message })
    }

    const newLocation = new Location(validateInfo.data)
    const locationAdded = await newLocation.save()
    res.status(201).json(locationAdded)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

export default router
