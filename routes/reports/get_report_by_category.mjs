import { Router } from 'express'
const router = Router()

import Asset from '../../models/asset.mjs'

router.get('/category/:categoryName', async (req, res) => {
  try {
    const categoryName = req.params.categoryName

    const assets = await Asset.find({ category: categoryName })

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
