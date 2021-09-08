const mongoose = require('mongoose');
const slugify = require('slugify');

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
  address: {
    street: { type: String, trim: true, lowercase: true },
    city: { type: String, trim: true, lowercase: true },
    state: { type: String, trim: true, lowercase: true },
    zip: Number,
  },
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
restaurantSchema.pre('save', function (next) {
  //Need to make the slug unique somehow
  this.slug = slugify(this.name, { lower: true, remove: /[*+~.()'"!:@]/g });
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
