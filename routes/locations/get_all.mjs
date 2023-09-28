import { Router } from 'express'
const router = Router()

import Location from '../../models/location.mjs'

router.get('/', async (req, res) => {
  try {
    const locations = await Location.find()
    res.status(200).json(locations)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

export default router
