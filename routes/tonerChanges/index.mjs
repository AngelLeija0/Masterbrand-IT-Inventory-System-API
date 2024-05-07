import { Router } from 'express';
import getAllRouter from './get_all.mjs';
import createRouter from './create.mjs';
import deleteRouter from "./delete.mjs"

const tonerChangesRouter = Router();

tonerChangesRouter.use(getAllRouter);
tonerChangesRouter.use(createRouter);
tonerChangesRouter.use(deleteRouter)

export default tonerChangesRouter;