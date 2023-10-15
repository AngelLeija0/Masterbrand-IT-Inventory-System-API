import { Router } from 'express'
const router = Router()

import Asset from '../../models/asset.mjs'
import { validatePartialAsset } from '../../schemas/asset.mjs'

router.patch('/update/:id', async (req, res) => {
  try {
    const assetInfo = req.body
    if (!assetInfo) {
      return res.status(400).json({ message: "Data no found it" })
    }

    const asset = await Asset.findById(req.params.id)
    if (!asset) {
      return res.status(404).json({ message: "Asset not found" })
    }
    
    asset.set(assetInfo)
    asset.updated_at = new Date()

    const assetUpdated = await asset.save()
    res.status(200).json(assetUpdated)
    
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: error.message })
  }
})

export default router
