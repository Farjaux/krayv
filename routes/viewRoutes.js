const express = require('express');
const viewsController = require('../controllers/viewsController');

const router = express.Router();

//rendering views with pug templates
router.get('/p', viewsController.getPosts);
router.get('/favorites', viewsController.getFavorites);
router.get('/restaurant', viewsController.getRestaurant);

module.exports = router;
