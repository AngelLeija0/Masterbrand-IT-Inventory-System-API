import express from 'express';
const app = express();
import mongoose from 'mongoose';

import dotenv from 'dotenv';
dotenv.config();

import cors from 'cors';

app.use(cors());

app.disable('x-powered-by');

mongoose.connect(process.env.MONGODB_URI + '/masterbrand-it-inventory-system-db', { useNewUrlParser: true, useUnifiedTopology: true, writeConcern: 'majority', dbName: 'masterbrand-it-inventory-system-db' });

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('Connected to MongoDB');
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

import administratorsRouter from './routes/administrators/index.mjs';
app.use('/administrators', administratorsRouter);

import assetsRouter from './routes/assets/index.mjs';
app.use('/assets', assetsRouter);

import categoriesRouter from './routes/categories/index.mjs';
app.use('/categories', categoriesRouter);

import locationsRouter from './routes/locations/index.mjs';
app.use('/locations', locationsRouter);

import notificationsRouter from './routes/notifications/index.mjs';
app.use('/notifications', notificationsRouter);

app.listen(3000, () => {
  console.log('Server started on port 3000');
});
