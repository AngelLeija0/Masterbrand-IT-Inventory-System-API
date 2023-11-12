import { Router } from 'express'
const router = Router()

import Asset from '../../models/asset.mjs'

router.get('/asset/:assetName', async (req, res) => {
  try {
    const assetName = req.params.assetName

    const assets = await Asset.find({
      $or: [{ description: assetName }, { model: assetName }]
    })

    if (assets == null || assets == {}) {
      return res.status(200).json({})
    }

    const reportResults = []

    const totalStock = assets.length
    reportResults.push({
      label: 'Cantidad en existencia',
      quantity: totalStock
    })

    const allStatus = assets.map(asset => asset.status.name)

    const uniqueAllStatus = deleteDuplicatedElements(allStatus)
    uniqueAllStatus.map(status => {
      if (status === 'Con stock' || status === 'Sin stock') {
        return
      }
      const totalStatus = assets.filter(
        asset => asset.status.name === status
      ).length
      reportResults.push({
        label: status + 's',
        quantity: totalStatus
      })
    })

    if (
      new RegExp('Impresora').test(assetName) ||
      new RegExp('Impresora').test(assets[0]?.description)
    ) {
      let totalNetwork = 0
      let totalLocal = 0

      assets.forEach(asset => {
        const preAsset = JSON.stringify(asset)
        const finalAsset = JSON.parse(preAsset)

        if (finalAsset.network_status !== undefined) {
          totalNetwork++
        } else {
          totalLocal++
        }
      })
      reportResults.push({
        label: 'En red',
        quantity: totalNetwork
      })
      reportResults.push({
        label: 'En local',
        quantity: totalLocal
      })
    }

    res.status(200).json(deleteDuplicatedElements(reportResults))
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

function deleteDuplicatedElements (array) {
  return array.filter((value, index, self) => {
    return self.indexOf(value) === index
  })
}

export default router
