const mongoose = require('mongoose');

const TempestWrathReviewSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  comment: String,
  rating: Number,
  date: String,
});

module.exports = mongoose.model('TempestWrathReview', TempestWrathReviewSchema, 'tempestWrathReviews');