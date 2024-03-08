import { Router } from 'express'
const router = Router()

import Toner from "./../../models/toner.mjs"

router.get('/', async (req, res) => {
  try {
    const toners = await Toner.find().sort({ created_at: -1 })
    if (toners == null || toners == {} || toners.length == 0) {
      return res.status(400).json({ code: 400, message: "No items founded" })
    }
    const filteredToners = toners.filter((toner) => toner.incomingStock && toner.outgoingStock)
    res.status(200).json(filteredToners)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

export default router