import { Router } from 'express';
import allProducts from './all_products.mjs';

const reportsRouter = Router();

reportsRouter.use(allProducts);

export default reportsRouter;