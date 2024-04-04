import { Router } from 'express'
const router = Router()

import Toner from '../../models/toner.mjs'
import createNotification from './../notifications/create.mjs'

import { mongo } from 'mongoose'

router.delete('/delete/:id', async (req, res) => {
  try {
    const tonerDeleted = await Toner.findByIdAndDelete(req.params.id)
    res.status(200).json({ message: "Delete it correctly", data: tonerDeleted })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

export default router
