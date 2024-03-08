import { Router } from 'express';
import getAllRouter from './get_all.mjs';
import createRouter from './create.mjs';

const tonerChangesRouter = Router();

tonerChangesRouter.use(getAllRouter);
tonerChangesRouter.use(createRouter);

export default tonerChangesRouter;