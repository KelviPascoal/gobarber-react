import { Request, Response, Router } from 'express';
import { parseISO } from 'date-fns'
import Appointment from '../models/Appointments';
import { AppointmentsRepository } from '../repositories/AppointmentsRepositiories';
import { CreateAppointmentsServices } from '../services/CreateAppointmentsService';


const appointmentsRouter = Router();

const appointmentsRepository = new AppointmentsRepository();

const appointments: Appointment[] = [];

appointmentsRouter.post('/appointments', (request: Request, response: Response) => {
   try {const { provider, date } = request.body;

    const parsedDate = parseISO(date)
   
    const createAppointment = new CreateAppointmentsServices(appointmentsRepository);

    const appointment = createAppointment.excute({
        date: parsedDate,
        provider,
    })

    return response.status(201).json(appointment);}
    catch(err) {
        return response.status(400).json({error: err.message})
    }
});

appointmentsRouter.get('/appointments', (request: Request, response: Response) => {
    const appointments = appointmentsRepository.findAll();
    return response.status(200).json(appointments)
})





// appointmentsRoutes.get('/appointments', appointmentsController.findAll)

export  {appointmentsRouter };