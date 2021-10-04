const mongoose = require('mongoose');
const slugify = require('slugify');
const Geocodio = require('geocodio-library-node');

const restaurantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A restaurant must have a name'],
    trim: true,
  },
  coverImage: { type: String, required: true },
  cuisine: { type: String, trim: true, lowercase: true },
  price: {
    type: Number,
    enum: [[1, 2, 3, 4], 'Must be a number between 1 - 4'],
    required: true,
  },
  phoneNumber: { type: String, trim: true },
  location: {
    type: {
      type: String,
      default: 'Point',
      enum: ['Point'],
    },
    coordinates: [Number],
    address: { type: String, required: [true, 'Please provide an address'] },
  },
  website: { type: String, trim: true, lowercase: true },
  delivery: {
    ubereats: { type: String, trim: true, lowercase: true },
    doordash: { type: String, trim: true, lowercase: true },
    grubhub: { type: String, trim: true, lowercase: true },
    postmates: { type: String, trim: true, lowercase: true },
  },
  users: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  posts: [
    {
      slug: String,
      imageFile: { type: String, reqired: true },
      krayv: { type: Number, default: 0 },
      about: {
        type: String,
        maxLength: [90, 'A post can only contain 90 characters'],
        reqired: true,
      },
      plateName: {
        type: String,
        maxLength: [20, 'A plate name can only contain 20 characters'],
        required: true,
      },
      meal: {
        type: String,
        enum: {
          values: ['b', 'br', 'l', 'd'],
          message: 'Does not match meal types',
        },
        required: true,
      },
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

///////// Indexing helps queries run faster instead of querying all docuemnts.
restaurantSchema.index({ slug: 1 });
restaurantSchema.index({ location: '2dsphere' });

////Pre hook
// https://www.npmjs.com/package/slugify
restaurantSchema.pre('save', function (next) {
  //Need to make the slug unique somehow (Update: Appended date created unix timestamp)
  this.slug =
    slugify(this.name, { lower: true, remove: /[*+~.()'"!:@]/g }) + Date.now();
  next();
});

// How to udpate coordinates if Restaurant updates address?
// What happens if the address provided is already in use or cannot be found
// Pre-save middleware for geocoding
// https://www.geocod.io/docs/
restaurantSchema.pre('save', async function (next) {
  const geocoder = new Geocodio(process.env.GEO_API);
  const output = await geocoder.geocode(this.location.address, [], 1);
  const { lat, lng } = output.results[0].location;
  this.location.coordinates = [lng, lat];
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
