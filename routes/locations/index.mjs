import { Router } from 'express';
import createRouter from './create.mjs';
import deleteRouter from './delete.mjs';
import getAllRouter from './get_all.mjs';
import getByIdRouter from './get_by_id.mjs';
import updateRouter from './update.mjs';

const locationsRouter = Router();

locationsRouter.use(createRouter);
locationsRouter.use(deleteRouter);
locationsRouter.use(getAllRouter);
locationsRouter.use(getByIdRouter);
locationsRouter.use(updateRouter);

export default locationsRouter;