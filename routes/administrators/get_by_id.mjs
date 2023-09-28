import { Router } from 'express'
const router = Router()

import Administrator from '../../models/administrator.mjs'

router.get('/:id', async (req, res) => {
  try {
    const administrator = await Administrator.findById(req.params.id)
    res.status(200).json(administrator)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

export default router
