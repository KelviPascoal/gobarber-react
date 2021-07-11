import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository'
import { getRepository, Repository } from "typeorm";
import Appointment from '../entities/Appointments';
import ICreateAppointmentsDTO from '@modules/appointments/dtos/ICreateAppointmentsDTO';

class AppointmentsRepository implements IAppointmentsRepository {
  private ormRepository: Repository<Appointment>;

  constructor() {
    this.ormRepository = getRepository(Appointment);
  }

  public async findByDate(date: Date): Promise<Appointment | undefined> {
    const findAppointment = await this.ormRepository.findOne({
      where: { date: date },
    });
    return findAppointment;
  }
  public async create({date, provider_id}:ICreateAppointmentsDTO): Promise<Appointment> {
    const appointment = this.ormRepository.create({date, provider_id})
    await this.ormRepository.save(appointment);
    return appointment;
  }

}



export default AppointmentsRepository;
