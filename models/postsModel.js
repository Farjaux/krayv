const mongoose = require('mongoose');

const postsSchema = new mongoose.Schema(
  [
    {
      createdAt: {
        type: Date,
        default: Date.now,
      },
      imageFile: { type: String, reqired: true },
      krayv: { type: Number, default: 0 },
      about: {
        type: String,
        maxLength: [90, 'A post can only contain 90 characters'],
        reqired: true,
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
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

///////////////////////////

const Posts = mongoose.model('Posts', postsSchema);

module.exports = Posts;
