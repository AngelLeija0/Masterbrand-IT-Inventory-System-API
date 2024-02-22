import { Router } from 'express'
const router = Router()

import Toner from '../../models/location.mjs'
import createNotification from './../notifications/create.mjs'

router.delete('/delete/:id', async (req, res) => {
    const tonerDeleted = await Toner.findByIdAndDelete(req.params.id)

    res.status(200).json({ message: "Delete it correctly" })
  try {
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

export default router
