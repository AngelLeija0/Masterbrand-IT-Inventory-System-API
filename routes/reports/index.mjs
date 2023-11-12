import { Router } from 'express';
import allAsset from './get_all_assets.mjs';
import allCategories from './get_all_categories.mjs'
import assetReport from './get_report_by_asset.mjs'
import categoryReport from './get_report_by_category.mjs'

const reportsRouter = Router()

reportsRouter.use(allAsset)
reportsRouter.use(allCategories)
reportsRouter.use(assetReport)
reportsRouter.use(categoryReport)

export default reportsRouter