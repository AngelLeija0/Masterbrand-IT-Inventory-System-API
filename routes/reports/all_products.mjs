import { Router } from 'express'
const router = Router()

import Asset from '../../models/asset.mjs'

router.get('/all-products', async (req, res) => {
  try {
    const assets = await Asset.find().sort({ created_at: -1 })

    if (assets == null || assets == {}) {
      return res.status(200).json({})
    }

    const preUniqueAssets = assets.map((asset) => {
        if (asset.model) {
            return asset.model
        }
        return asset.description
    })

    const uniqueAssets = deleteDuplicatedElement(preUniqueAssets)

    res.status(200).json(uniqueAssets)

  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

function deleteDuplicatedElement(array) {
    return array.filter((value, index, self) => {
      return self.indexOf(value) === index;
    });
  }

export default router
