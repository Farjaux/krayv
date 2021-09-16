const express = require('express');
const restaurantController = require('../controllers/restaurantController');
const authController = require('../controllers/authController');

const router = express.Router();

// for routes that need users logged in authController.protect
router
  .route('/')
  .get(restaurantController.getAllRestaurants)
  .post(
    authController.protect,
    authController.restrictTo('restaurantAdmin', 'superAdmin'),
    restaurantController.createRestaurant
  );
router
  .route('/:id')
  .get(restaurantController.getRestaurant)
  .patch(
    authController.protect,
    authController.restrictTo('restaurantAdmin', 'superAdmin'),
    restaurantController.updateRestaurant
  )
  .delete(
    authController.protect,
    authController.restrictTo('restaurantAdmin', 'superAdmin'),
    restaurantController.deleteRestaurant
  );

module.exports = router;
