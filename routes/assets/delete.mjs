import { Router } from 'express'
const router = Router()

import Asset from '../../models/asset.mjs'

router.delete('/delete/:id', async (req, res) => {
  await Asset.findByIdAndDelete(req.params.id)
  res.status(200)
  try {
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

export default router
