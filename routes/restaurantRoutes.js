const express = require('express');
const restaurantController = require('../controllers/restaurantController');
const authController = require('../controllers/authController');

const router = express.Router();

router
  .route('/')
  .get(authController.protect, restaurantController.getAllRestaurants)
  .post(restaurantController.createRestaurant);
router
  .route('/:id')
  .get(restaurantController.getRestaurant)
  .patch(restaurantController.updateRestaurant)
  .delete(
    authController.protect,
    authController.restrictTo('restaurantAdmin'),
    restaurantController.deleteRestaurant
  );

module.exports = router;
