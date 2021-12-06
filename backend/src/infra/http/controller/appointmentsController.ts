import { CreateAppointmentsServices } from "app/services/CreateAppointmentsService/CreateAppointmentsService";
import { parseISO } from "date-fns";
import { Request, Response } from "express";
import { container } from "tsyringe";

export default class AppointmentsController {
  public async create(request: Request, response: Response) {
    try {
      const { provider_id, date } = request.body;

      const parsedDate = parseISO(date);

      const createAppointment = container.resolve(CreateAppointmentsServices);

      const appointment = await createAppointment.excute({
        date: parsedDate,
        provider_id,
      });

      return response.status(201).json(appointment);
    } catch (err: any) {
      return response.status(400).json({ error: err.message });
    }
  }
}
