import { Router } from 'express'
const router = Router()

import Asset from '../../models/asset.mjs'
import { validateAsset } from '../../schemas/asset.mjs'

router.post('/create', async (req, res) => {
  try {
    const assetInfo = req.body
    if (!assetInfo) {
      return res.status(400).json({ message: "Data no found it" })
    }

    const validateInfo = validateAsset(assetInfo)
    if (validateInfo.error) {
      return res.status(400).json({ message: validateInfo.error.message })
    }

    const newAsset = new Asset(validateInfo.data)

    console.log(assetInfo.images)

    //const assetAdded = await newAsset.save()
    //res.status(201).json(assetAdded)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})


async function saveImages(images) {
  console.log(images)
}

export default router
