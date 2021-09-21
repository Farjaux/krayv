const path = require('path');
const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const restaurantRouter = require('./routes/restaurantRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

// Pug templates for client side rendering
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

///////////////////
///////GLOBAL Middleware

// Serving static files
app.use(express.static(path.join(__dirname, 'public')));

// https://www.npmjs.com/package/helmet
// Set security HTTP headers
app.use(helmet());

// Development logging
if (process.env.NODE_ENV === 'development') {
  //Morgan
  app.use(morgan('dev'));
}

// https://www.npmjs.com/package/express-rate-limit
// Protect again Brute Force and Denial-of-Service Attacks. Rate limit 100 requests per hour
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try again later',
});
app.use('/api', limiter);

// Body parser, reading data from body into req.body
app.use(express.json({ limit: '10kb' }));

// Data Sanitization against NoSQL query injection
// Removes query symbols from requests
// https://www.npmjs.com/package/express-mongo-sanitize
app.use(mongoSanitize());

// Data Sanitization against Cross-Site Scripting (XSS) Attacks
// Removes malicious HTML code
// https://www.npmjs.com/package/xss-clean
app.use(xss());

// Prevent paramter pollution
// Cleans query string
// https://www.npmjs.com/package/hpp
// To add whitelisted parameters { whitelist: [], }
app.use(hpp());

// To get request time
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

///////////////////
///////Routes

//rendering views with pug templates
app.get('/views', (req, res) => {
  // res.set('Content-Type', 'text/html');
  res.status(200).render('base');
});
//api routes
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
