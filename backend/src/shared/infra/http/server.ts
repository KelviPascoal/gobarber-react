import 'reflect-metadata';

import express, {Request, Response, NextFunction} from 'express';
import 'express-async-errors';
import '@shared/infra/typeorm';

import routes from '@shared/infra/http/routes';
import uploadConfig from 'app/config/upload';
import AppError from '@shared/errors/AppErrors';

import '@shared/container';

const app = express();
app.use(express.json())
const PORT = 3333;

app.use('/files', express.static(uploadConfig.directory));
app.use(routes);

app.use((err: Error, request: Request , response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
        return response.status(err.statusCode).json({
            status: 'error',
            message: err.message,
        })
    }
    console.error(err);
    return response.status(500).json({
        status: 'error',
        message: 'Internal server error',
    })
})

app.listen(PORT, () => {
    console.log('🐱 server is running');
    
} )