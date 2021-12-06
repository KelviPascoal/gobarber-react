import Appointment from "../../../infra/typeorm/entities/Appointments";
import ICreateAppointmentsDTO from "../../../types/dtos/ICreateAppointmentsDTO";

export default interface IAppointmentsRepository {
    create(data: ICreateAppointmentsDTO): Promise<Appointment>
    findByDate(date: Date): Promise<Appointment | undefined>
}