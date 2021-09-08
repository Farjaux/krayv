const express = require('express');
const morgan = require('morgan');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const restaurantRouter = require('./routes/restaurantRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

///////////////////
///////Middleware
if (process.env.NODE_ENV === 'development') {
  //Morgan
  app.use(morgan('dev'));
}

//Express
app.use(express.json());
app.use(express.static(`${__dirname}/public`));

//To get request time
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

///////////////////
///////Routes
app.use('/api/v1/restaurants', restaurantRouter);
app.use('/api/v1/users', userRouter);

///////////////////
///////Route Handler to check for valid route (appError.js in utils)
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

///////////////////
///////errorController.js
app.use(globalErrorHandler);

module.exports = app;
