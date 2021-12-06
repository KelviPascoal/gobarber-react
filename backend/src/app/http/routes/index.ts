import { Router } from 'express';
import { appointmentsRouter } from 'infra/http/routes/appointments.routes';
import { sessionsRouter } from 'infra/http/routes/sessions.routes';
import { usersRouter } from 'infra/http/routes/users.routes';

const routes = Router();

routes.use("/users",usersRouter);
routes.use("/users",sessionsRouter);

routes.use("/users",appointmentsRouter);



export default routes;