import { Router } from 'express'
import fs from 'fs/promises'

import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const router = Router()
import Asset from '../../models/asset.mjs'

router.delete('/delete/:id', async (req, res) => {
  try {
    const idAsset = req.params.id
    const assetToDelete = await Asset.findById(idAsset)

    if (!assetToDelete) {
      return res.status(404).json({ message: 'Registro no encontrado' })
    }

    const imagesToDelete = assetToDelete.images?.all
    if (imagesToDelete.length > 0) {
      imagesToDelete.images.all.map(async image => {
        const imagePath = path.resolve(__dirname, '../../', 'uploads', image)
        console.log(imagePath)
        await fs.unlink(imagePath)
      })
    }

    await Asset.findByIdAndDelete(idAsset)

    return res.status(200).json({ message: 'Registro eliminado correctamente' })
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
})

export default router
