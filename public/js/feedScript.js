/* eslint-disable */
'use strict';

////////////// FILTERS //////////////////
//Geofilter
const geoFilter = document.querySelector('.geofilter');
const geoFilterBtn = document.querySelector('.bottomnav__btn--map');
//Regular Filters
const filters = document.querySelector('.filters');
const filtersBtn = document.querySelector('.bottomnav__btn--filter');
//Close Filters
const closeGeoFilterBtn = document.querySelector('.geoClose');
const closeFiltersBtn = document.querySelector('.filterClose');
//Overlay filter
const overlay = document.querySelector('.overlay');

////////////// RENDER MAP //////////////////
// const map = L.map('map').setView([43.615, -116.2023], 13);

// L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//   attribution:
//     '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
// }).addTo(map);

////////////// GEO FILTERS //////////////////
const openGeoFilter = function () {
  geoFilter.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeGeoFilter = function () {
  geoFilter.classList.add('hidden');
  overlay.classList.add('hidden');
};

geoFilterBtn.addEventListener('click', openGeoFilter);
closeGeoFilterBtn.addEventListener('click', closeGeoFilter);

// ////////////// FILTERS //////////////////
const openFilters = function () {
  filters.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeFilters = function () {
  filters.classList.add('hidden');
  overlay.classList.add('hidden');
};

filtersBtn.addEventListener('click', openFilters);
closeFiltersBtn.addEventListener('click', closeFilters);

////////////// FEED //////////////////
const krayvBtn = document.querySelectorAll('.post__content--krayv');

console.log(krayvBtn.length);
// for (let i = 0; i < krayvBtn.length; i++) {
//   console.log(krayvBtn[i]);
// }
