import 'reflect-metadata';
import express from 'express';
import routes from './routes';
import './database';
import uploadConfig from './config/upload';

const app = express();
app.use(express.json())
const PORT = 3333;

app.use('/files', express.static(uploadConfig.directory));
app.use(routes);

app.listen(PORT, () => {
    console.log('🐱 server is running');
    
} )