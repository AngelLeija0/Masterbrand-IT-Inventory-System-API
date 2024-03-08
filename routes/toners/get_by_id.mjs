import { Router } from 'express'
const router = Router()

import Toner from "./../../models/toner.mjs"

router.get('/:id', async (req, res) => {
  try {
    const toner = await Toner.findById(req.params.id)
    if (toner == null || toner == {} || toner.length == 0) {
      return res.status(400).json({ code: 400, message: "No item founded" })
    }
    res.status(200).json(toner)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

export default router
