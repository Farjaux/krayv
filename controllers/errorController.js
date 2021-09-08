const AppError = require('../utils/appError');

///////////////////
///////Global middleware error handler https://expressjs.com/en/guide/error-handling.html

//Handle errors where the path is invalid
const handleCastErrorDB = (err) => {
  const message = `Invalid ${err.path}: ${err.value}.`;
  return new AppError(message, 400);
};

// //Handle errors for fields that need to be unique (not currently needed)
// const handleDuplicateFieldsDB = (err) => {
//   const value = err.errmsg.match(/(["'])(\\?.)*?\1/);
//   const message = `Duplicate field value: ${value}. Please use another value.`;
//   return new AppError(message, 400);
// };

const handleValidationErrorDB = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message);

  const message = `Invalide input data. ${errors.join('. ')}`;
  return new AppError(message, 400);
};

const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

const sendErrorProd = (err, res) => {
  // Operational, trusted error: send message to client
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });

    // Programming or other unknown error: don't leak error details
  } else {
    //1) Log Error
    console.error('Error', err);

    //2) Send general message
    res.status(500).json({
      status: 'error',
      message: 'Something went wrong.',
    });
  }
};

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV === 'production') {
    let error = { ...err };
    error.name = err.name;

    //Handle errors where the path is invalid
    if (error.name === 'CastError') error = handleCastErrorDB(error);
    // //Handle errors for fields that need to be unique
    // if (error.code === 11000) error = handleDuplicateFieldsDB(error);
    //Handle errors when incorrect values are used in fields
    if (error.name === 'ValidationError')
      error = handleValidationErrorDB(error);

    sendErrorProd(error, res);
  }
};
