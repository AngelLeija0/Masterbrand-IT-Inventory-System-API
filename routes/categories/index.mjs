import { Router } from 'express';
import createRouter from './create.mjs';
import deleteRouter from './delete.mjs';
import getAllRouter from './get_all.mjs';
import getByIdRouter from './get_by_id.mjs';
import updateRouter from './update.mjs';

const categoriesRouter = Router();

categoriesRouter.use(createRouter);
categoriesRouter.use(deleteRouter);
categoriesRouter.use(getAllRouter);
categoriesRouter.use(getByIdRouter);
categoriesRouter.use(updateRouter);

export default categoriesRouter;