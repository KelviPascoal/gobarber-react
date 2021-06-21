import { Request, Response, Router } from 'express';
import { uuid } from 'uuidv4';
import { appointmentsController } from '../controllers/appointmentsController';
import {startOfHour, parseISO, isEqual } from 'date-fns'

interface Appointment {
    id: string;
    provider: string;
    date: Date;
}

const appointmentsRouter = Router();

const appointments: Appointment[] = [];

appointmentsRouter.post('/appointments', (request: Request, response: Response) => {
    const { provider, date } = request.body;

    const parsedDate = startOfHour(parseISO(date))

    const findAppointmentsInSameDate = appointments.find(appointment => 
        isEqual(parsedDate, appointment.date)
        );

        if(findAppointmentsInSameDate) {
            return response.status(400).json({ message: 'essa hora ja esta agendada'})
        }

    const appointment = {
        id: uuid(),
        provider: provider,
        date: parsedDate,
    }
    appointments.push(appointment)
    return response.json(appointment)
});

appointmentsRouter.get('/appointments', (request: Request, response: Response) => {

    response.status(200).json(appointments)
})





// appointmentsRoutes.get('/appointments', appointmentsController.findAll)

export  {appointmentsRouter };