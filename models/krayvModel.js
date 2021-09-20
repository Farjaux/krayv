// comment  / like / createdAt / ref to Image / ref to user

//////////////////
//////Possible solution for tracking comments and likes on restaurant images (not yet implemented)

const mongoose = require('mongoose');

const krayvSchema = new mongoose.Schema(
  {
    createdAt: {
      type: Date,
      default: Date.now,
    },
    comment: String,
    krayv: Boolean,
    restaurantImage: {
      type: mongoose.Schema.ObjectId,
      ref: 'Restaurant',
      required: [true, 'Comment must belong to a restaurant'],
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'Comment must belong to a user'],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

//////////////////////////

const Krayv = mongoose.model('Krayv', krayvSchema);

module.exports = Krayv;
