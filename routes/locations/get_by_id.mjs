import { Router } from 'express'
const router = Router()

import Location from '../../models/location.mjs'

router.get('/:id', async (req, res) => {
    try {
      const location = await Location.findById(req.params.id)
      res.status(200).json(location)
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  })

export default router
