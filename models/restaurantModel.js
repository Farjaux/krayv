const mongoose = require('mongoose');
const slugify = require('slugify');
const Geocodio = require('geocodio-library-node');

const restaurantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A restaurant must have a name'],
    trim: true,
    lowercase: true,
  },
  coverImage: { type: String, required: true },
  cuisine: { type: String, trim: true, lowercase: true },
  price: {
    type: Number,
    enum: [[1, 2, 3, 4], 'Must be a number between 1 - 4'],
    required: true,
  },
  phoneNumber: { type: String, trim: true },
  lat: { type: Number, select: false },
  lng: { type: Number, select: false },
  address: { type: String, required: [true, 'Please provide an address'] },
  website: { type: String, trim: true, lowercase: true },
  delivery: {
    ubereats: { type: String, trim: true, lowercase: true },
    doordash: { type: String, trim: true, lowercase: true },
    grubhub: { type: String, trim: true, lowercase: true },
    postmates: { type: String, trim: true, lowercase: true },
  },
  breakfast: [
    {
      image: String,
      krayv: { type: Number, default: 0 },
      post: {
        type: String,
        maxlength: [90, 'A post can only contain 90 characters'],
      },
      type: { type: String, default: 'break' },
    },
  ],
  brunch: [
    {
      image: String,
      krayv: { type: Number, default: 0 },
      post: {
        type: String,
        maxlength: [90, 'A post can only contain 90 characters'],
      },
      type: { type: String, default: 'brunch' },
    },
  ],
  lunch: [
    {
      image: String,
      krayv: { type: Number, default: 0 },
      post: {
        type: String,
        maxlength: [90, 'A post can only contain 90 characters'],
      },
      type: { type: String, default: 'lunch' },
    },
  ],
  dinner: [
    {
      image: String,
      krayv: { type: Number, default: 0 },
      post: {
        type: String,
        maxlength: [90, 'A post can only contain 90 characters'],
      },
      type: { type: String, default: 'dinn' },
    },
  ],
  createdAt: { type: Date, default: Date.now(), select: false },
  slug: String,
});

/////Custom validator to check against uploading too many images
// const validator = function imageLimit(v) {
//   return v.length <= 5;
// };
// restaurantSchema
//   .path('breakfast')
//   .validate(validator, 'No more than five photos allowed');

////////////////////
////// MONGOOSE Middleware
/*
https://mongoosejs.com/docs/middleware.html
Types: document, query, aggregate, model
*/

////DOCUMENT Middleware: runs before .save() and .create()

////Pre hook
// https://www.npmjs.com/package/slugify
restaurantSchema.pre('save', function (next) {
  //Need to make the slug unique somehow (Update: Appended date created unix timestamp)
  this.slug =
    slugify(this.name, { lower: true, remove: /[*+~.()'"!:@]/g }) + Date.now();
  next();
});

// Pre-save middleware for geocodign
// https://www.geocod.io/docs/
restaurantSchema.pre('save', async function (next) {
  const geocoder = new Geocodio('634e412158103814a1f842a6e0331ef0f3363a2');
  const output = await geocoder.geocode(this.address, [], 1);
  const { lat, lng } = output.results[0].location;
  this.lat = lat;
  this.lng = lng;
  next();
});

// restaurantSchema.pre('save', function (next) {
//   console.log('Will save document...');
//   next();
// });

////Post hook
// restaurantSchema.post('save', function (doc, next) {
//   console.log(doc);
//   next();
// });

////QUERY Middleware: runs before or after a certain query is executed

////Pre hook which will run before .find()
// restaurantSchema.pre('find', function (next) {
//   next();
// });

////Post hook which will run before .find()
// restaurantSchema.post('find', function (doc, next) {
//   console.log(doc);
//   next();
// });

////AGGREGATION Middleware: runs before or after the aggregation happens

////Pre hook
// restaurantSchema.pre('aggregate', function (next) {
//   console.log(this);
//   next();
// });

/////////////////////////

const Restaurant = mongoose.model('Restaurant', restaurantSchema);

module.exports = Restaurant;
