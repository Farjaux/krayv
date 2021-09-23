const Restaurants = require('../models/restaurantModel');
const catchAsync = require('../utils/catchAsync');

exports.getPosts = catchAsync(async (req, res) => {
  // 1) Get post data from collection
  const restaurants = await Restaurants.find();
  const posts = [];
  for (let i = 0; i < restaurants.length; i++) {
    for (let p = 0; p < restaurants[i].posts.length; p++) {
      const allPosts = restaurants[i].posts[p];
      posts.push(allPosts);
    }
  }
  // 2) Build Template

  // 3) Render that template using post data from 1
  res.status(200).render('feed', {
    posts,
  });
});

exports.getFavorites = (req, res) => {
  res.status(200).render('favorites', {
    title: '| favs',
  });
};

exports.getRestaurant = (req, res) => {
  res.status(200).render('restaurant', {
    title: '| restaurant',
  });
};
