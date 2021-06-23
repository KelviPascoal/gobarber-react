import Appointment from "../models/Appointments";
import {AppointmentsRepository} from "../repositories/AppointmentsRepositiories"
import {startOfHour} from 'date-fns'


interface Request {
    date: Date;
    provider: string; 

}

class CreateAppointmentsServices {
    private appointmentsRepository: AppointmentsRepository

    constructor(appointmentsRepository: AppointmentsRepository) {
        this.appointmentsRepository = appointmentsRepository
    }

    public excute({ provider, date }: Request): Appointment {
        const appointmentDate = startOfHour(date)

        const findAppointmentsInSameDate = this.appointmentsRepository.findByDate(appointmentDate)
    
            if(findAppointmentsInSameDate) {
                throw Error('essa hora ja esta agendada')
            }
    
        const appointment = this.appointmentsRepository.create(provider, appointmentDate)
        return appointment;
    }
}

export {CreateAppointmentsServices};