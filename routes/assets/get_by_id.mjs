import { Router } from 'express'
const router = Router()

import Asset from '../../models/asset.mjs'

router.get('/:id', async (req, res) => {
  try {
    const asset = await Asset.findById(req.params.id)
    res.status(200).json(asset)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

export default router
