import Appointment from "@modules/appointments/infra/typeorm/entities/Appointments";
import AppointmentsRepository from "../infra/typeorm/repositories/AppointmentsRepositiory";
import { startOfHour } from "date-fns";
import AppError from "@shared/errors/AppErrors";
import IAppointmentsRepository from "../repositories/IAppointmentsRepository";

import { injectable, inject } from 'tsyringe';

interface IRequest {
  date: Date;
  provider_id: string;
}
@injectable()
class CreateAppointmentsServices {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository) {}

  public async execute({ provider_id, date }: IRequest): Promise<Appointment> {
    const appointmentDate = startOfHour(date);

    const findAppointmentsInSameDate =
      await this.appointmentsRepository.findByDate(appointmentDate);

    if (findAppointmentsInSameDate) {
      throw new AppError("essa hora ja esta agendada");
    }

    const appointment = await this.appointmentsRepository.create({
      provider_id,
      date: appointmentDate,
    });
    return appointment;
  }
}

export { CreateAppointmentsServices };
