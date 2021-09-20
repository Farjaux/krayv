const Restaurant = require('../models/restaurantModel');
const catchAsync = require('../utils/catchAsync');
const factory = require('./handlerFactory');
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

exports.getAllRestaurants = factory.getAll(Restaurant);
exports.getRestaurant = factory.getOne(Restaurant);
exports.createRestaurant = factory.createOne(Restaurant);
exports.updateRestaurant = factory.updateOne(Restaurant);
exports.deleteRestaurant = factory.deleteOne(Restaurant);
/////////////////
//////This function is now in factory handler controller
// exports.deleteRestaurant = catchAsync(async (req, res, next) => {
//   const restaurant = await Restaurant.findByIdAndDelete(req.params.id);

//   if (!restaurant) {
//     return next(new AppError('No tour found with that ID', 404));
//   }

//   res.status(204).json({
//     status: 'success',
//     data: null,
//   });
// });

///////////////////
///////Aggregation pipeline through MongoDB
/*
https://docs.mongodb.com/manual/core/aggregation-pipeline/
*/

// '/rests-within/:distance/center/:latlng'
exports.getRestaurantsWithin = catchAsync(async (req, res, next) => {
  const { distance, latlng } = req.params;
  const [lat, lng] = latlng.split(',');

  const radius = distance / 3963.2;

  if (!lat || !lng) {
    next(
      new AppError(
        'Please provide latitude and longitude in format lat,lng',
        400
      )
    );
  }

  const restaurants = await Restaurant.find({
    location: { $geoWithin: { $centerSphere: [[lng, lat], radius] } },
  });

  res.status(200).json({
    status: 'success',
    restults: restaurants.length,
    data: {
      data: restaurants,
    },
  });
});
