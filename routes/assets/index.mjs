import { Router } from 'express';
import createRouter from './create.mjs';
import deleteRouter from './delete.mjs';
import getAllRouter from './get_all.mjs';
import getByIdRouter from './get_by_id.mjs';
import updateRouter from './update.mjs';

const assetsRouter = Router();

assetsRouter.use(createRouter);
assetsRouter.use(deleteRouter);
assetsRouter.use(getAllRouter);
assetsRouter.use(getByIdRouter);
assetsRouter.use(updateRouter);

export default assetsRouter;