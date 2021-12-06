import { container } from 'tsyringe';

import 'providers';

import IAppointmentsRepository from 'domain/repositories/IAppointmentsRepository';
import AppointmentsRepository from 'infra/typeorm/repositories/AppointmentsRepositiory';

import IUsersRepository from 'domain/repositories/IUsersRepository'
import UsersRepository from 'infra/typeorm/repositories/UsersRepository';


container.registerSingleton<IAppointmentsRepository>('AppointmentsRepository', AppointmentsRepository);

container.registerSingleton<IUsersRepository>('UsersRepository', UsersRepository);


