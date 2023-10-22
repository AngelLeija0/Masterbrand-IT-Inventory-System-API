import { Router } from 'express'
const router = Router()

import Asset from '../../models/asset.mjs'

router.get('/', async (req, res) => {
  try {
    const assets = await Asset.find().sort({ created_at: -1 })

    if (assets == null || assets == {}) {
      return res.status(200).json({})
    }

    const assetsToSend = []
    assets.map(asset => {
      const assetMainInfo = {
        _id: asset._id,
        category: asset.category,
        image: asset.images.default_image,
        description: asset.description,
        manufacturer: asset.manufacturer,
        model: asset.model,
        serial_number: asset.serial_number,
        location: asset.location,
        location_extra_info: asset.location_extra_info,
        current_employee: asset.current_employee,
        status: asset.status.name,
        created_at: asset.created_at
      }
      assetsToSend.push(assetMainInfo)
    })

    res.status(200).json(assetsToSend)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

export default router
