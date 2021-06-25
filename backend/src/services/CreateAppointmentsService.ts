import Appointment from "../models/Appointments";
import AppointmentsRepository from "../repositories/AppointmentsRepositiory"
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

    public async excute({ provider, date }: Request): Promise<Appointment> {
        const appointmentDate = startOfHour(date)

        const findAppointmentsInSameDate = await this.appointmentsRepository.findByDate(appointmentDate)
    
            if(findAppointmentsInSameDate) {
                throw Error('essa hora ja esta agendada')
            }
        
        const appointment = this.appointmentsRepository.create({
            provider,
            date: appointmentDate,
        });
        
        await this.appointmentsRepository.save(appointment)
        return appointment;
    }
}

export {CreateAppointmentsServices};