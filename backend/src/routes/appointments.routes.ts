import { Request, Response, Router } from "express";
import { parseISO } from "date-fns";
import AppointmentsRepository from "../repositories/AppointmentsRepositiory";
import { CreateAppointmentsServices } from "../services/CreateAppointmentsService";
import { getCustomRepository } from "typeorm";

import ensureAuthenticated from "../middlewares/ensureAuthenticated";

const appointmentsRouter = Router();

appointmentsRouter.use(ensureAuthenticated)


appointmentsRouter.get("/appointments", async (request: Request, response: Response) => {
    
    const appointmentsRepository = getCustomRepository(AppointmentsRepository);
    const appointments = await appointmentsRepository.find();
    return response.status(200).json(appointments);
  }
);

appointmentsRouter.post("/appointments", async (request: Request, response: Response) => {
    try {
      const { provider_id, date } = request.body;

      const parsedDate = parseISO(date);

      const appointmentsRepository = getCustomRepository(AppointmentsRepository);

      const createAppointment = new CreateAppointmentsServices(
        appointmentsRepository
      );

      const appointment = await createAppointment.excute({
        date: parsedDate,
        provider_id,
      });

      return response.status(201).json(appointment);
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }
);



export { appointmentsRouter };