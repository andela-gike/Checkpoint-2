import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import documentRouter from './documentRoutes';
import roleRouter from './roleRoutes';
import userRouter from './userRoutes';
import searchRouter from './searchRoutes';
import paginationRouter from './paginationRoutes';

const app = express();

app.use(logger('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// app.get('/', (req, res) => {
//   res.status(200).send({ message: 'Welcome to DOCMAN bot!' });
// });

app.use('/api/users', userRouter);
app.use('/api/documents', documentRouter);
app.use('/api/roles', roleRouter);
app.use('/api/search', searchRouter);
app.use('/api/pagination', paginationRouter);


export default app;
