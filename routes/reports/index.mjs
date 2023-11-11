import { Router } from 'express';
import allAsset from './get_all_assets.mjs';
import assetReport from './get_asset_report.mjs'

const reportsRouter = Router();

reportsRouter.use(allAsset);
reportsRouter.use(assetReport);

export default reportsRouter;