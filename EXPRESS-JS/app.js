const express = require('express');
// const morgan = require('morgan');
const router = require('./routes/TourRouter');
const app = express();

app.use(express.json());
app.use('/natours/api/v1/tours',router);
// app.use(morgan());

module.exports = app;
