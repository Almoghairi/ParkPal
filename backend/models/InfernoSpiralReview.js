const mongoose = require('mongoose');

const InfernoSpiralReviewSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  comment: String,
  rating: Number,
  date: String,
});

module.exports = mongoose.model('InfernoSpiralReview', InfernoSpiralReviewSchema, 'infernoSpiralReviews');