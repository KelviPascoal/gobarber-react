import { Router } from 'express';
import {appointmentsRouter} from './appointments.routes';
import { usersRouter } from './users.routes';
import { sessionsRouter } from './sessions.routes';

const routes = Router();

routes.use(usersRouter);
routes.use(sessionsRouter);

routes.use(appointmentsRouter);



export default routes;