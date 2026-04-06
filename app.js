// src/app.js
import express from 'express';
import {pool} from './src/db/connection.js';
import customersRouter from './src/routes/customers.js';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();
const app = express();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

pool.connect().then(() => console.log('Connected to PostgreSQL'))
.catch(err => {
  console.error('Connection error', err.stack);
  process.exit(-1);
});

app.use('/api/customers', customersRouter);

app.listen(process.env.PORT, () => console.log('Server running'));