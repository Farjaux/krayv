const Restaurant = require('../models/restaurantModel');
const Restaurants = require('../models/restaurantModel');
const catchAsync = require('../utils/catchAsync');

exports.getPosts = catchAsync(async (req, res) => {
  // 1) Get post data from collection
  const restaurants = await Restaurants.find();

  // const posts = [];
  // for (let i = 0; i < restaurants.length; i++) {
  //   for (let p = 0; p < restaurants[i].posts.length; p++) {
  //     const allPosts = restaurants[i].posts[p];
  //     posts.push(allPosts);
  //   }
  // }
  // Shuffle posts to show in random order (knuth-shuffle)
  // const shuffledPosts = function (array) {
  //   let currentIndex = array.length;
  //   let randomIndex;
  //   while (currentIndex !== 0) {
  //     randomIndex = Math.floor(Math.random() * currentIndex);
  //     currentIndex--;

  //     [array[currentIndex], array[randomIndex]] = [
  //       array[randomIndex],
  //       array[currentIndex],
  //     ];
  //   }
  //   return array;
  // };
  // const posts = unshuffledPosts;

  // 2) Build Template

  // 3) Render that template using post data from 1
  res.status(200).render('feed', {
    restaurants,
  });
});

exports.getRestaurants = catchAsync(async (req, res) => {
  // 1) Get post data from collection
  const restaurants = await Restaurants.find();

  res.status(200).render('feed', {
    restaurants,
  });
});

exports.getFavorites = (req, res) => {
  res.status(200).render('favorites', {
    title: '| Favorites',
  });
};

exports.getRestaurant = catchAsync(async (req, res) => {
  const restaurant = await Restaurant.findOne({ slug: req.params.slug });

  res.status(200).render('restaurant', {
    title: `| ${restaurant.name}`,
    restaurant,
  });
});
