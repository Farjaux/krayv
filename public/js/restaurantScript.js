/* eslint-disable */
'use strict';

//Favorites
const favBtn = document.querySelector('.btn__fav');

//Hours
const hoursBtn = document.querySelector('.restaurant__hours--btn');
const showHours = document.querySelector('.restaurant__hours--time');

//Breakfast
const breakfastBtn = document.querySelector('.btn--breakfast');
const showBreakfast = document.querySelector('.breakfast');

//Brunch
const brunchBtn = document.querySelector('.btn--brunch');
const showBrunch = document.querySelector('.brunch');

//Lunch
const lunchBtn = document.querySelector('.btn--lunch');
const showLunch = document.querySelector('.lunch');

//Dinner
const dinnerBtn = document.querySelector('.btn--dinner');
const showDinner = document.querySelector('.dinner');

////////////// ADD TO FAVORITES ///////////////////

const addFavorite = function () {
  console.log('my favorite');
};
favBtn.addEventListener('click', addFavorite);

////////////// SHOW HIDDEN OBJECTS //////////////////

// HOURS
const hoursShow = function () {
  if (showHours.style.display === 'block') {
    showHours.style.display = 'none';
  } else {
    showHours.style.display = 'block';
  }
};
hoursBtn.addEventListener('click', hoursShow);

//BREAKFAST
const breakfastShow = function () {
  if (showBreakfast.style.display === 'block') {
    showBreakfast.style.display = 'none';
  } else {
    showBreakfast.style.display = 'block';
  }
};
breakfastBtn.addEventListener('click', breakfastShow);

//Brunch
const brunchShow = function () {
  if (showBrunch.style.display === 'block') {
    showBrunch.style.display = 'none';
  } else {
    showBrunch.style.display = 'block';
  }
};
brunchBtn.addEventListener('click', brunchShow);

//Lunch
const lunchShow = function () {
  if (showLunch.style.display === 'block') {
    showLunch.style.display = 'none';
  } else {
    showLunch.style.display = 'block';
  }
};
lunchBtn.addEventListener('click', lunchShow);

//Dinner
const dinnerShow = function () {
  if (showDinner.style.display === 'block') {
    showDinner.style.display = 'none';
  } else {
    showDinner.style.display = 'block';
  }
};
dinnerBtn.addEventListener('click', dinnerShow);
