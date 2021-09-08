const Restaurant = require('../models/restaurantModel');
const APIFeatures = require('../utils/apiFeatures');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

/*
.find(), .findById(), .creat(), .findByIdAndUpdate() are all functions of Mongoose. See Mongoose documentation for more useful functions. https://mongoosejs.com/
*/

///////////////////
///////Middleware to Manipulate filters before getting all restaurants
exports.defaultFilter = (req, res, next) => {
  /*
    Function that will add default query filter based on location and time of day
  */
};

///////////////////
///////Get all restaurants
exports.getAllRestaurants = catchAsync(async (req, res, next) => {
  ///EXECUTE QUERY
  const features = new APIFeatures(Restaurant.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();

  const restaurants = await features.query;

  /// SEND RESPONSE
  res.status(200).json({
    status: 'success',
    results: restaurants.length,
    data: {
      restaurants,
    },
  });
});

///////////////////
///////Get single restaurant
exports.getRestaurant = catchAsync(async (req, res, next) => {
  const restaurant = await Restaurant.findById(req.params.id);

  if (!restaurant) {
    return next(new AppError('No tour found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      restaurant,
    },
  });
});

///////////////////
///////Create new restaurant
exports.createRestaurant = catchAsync(async (req, res, next) => {
  const newRestaurant = await Restaurant.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      restuarant: newRestaurant,
    },
  });
});

///////////////////
///////Update restaurant
exports.updateRestaurant = catchAsync(async (req, res, next) => {
  const restaurant = await Restaurant.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );

  if (!restaurant) {
    return next(new AppError('No tour found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    restaurant,
  });
});

///////////////////
///////Delete restaurant
exports.deleteRestaurant = catchAsync(async (req, res, next) => {
  const restaurant = await Restaurant.findByIdAndDelete(req.params.id);

  if (!restaurant) {
    return next(new AppError('No tour found with that ID', 404));
  }

  res.status(204).json({
    status: 'success',
    data: null,
  });
});

///////////////////
///////Aggregation pipeline through MongoDB
/*
https://docs.mongodb.com/manual/core/aggregation-pipeline/
*/
