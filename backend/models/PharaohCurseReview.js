const mongoose = require('mongoose');

const PharaohCurseReviewSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  comment: String,
  rating: Number,
  date: String,
});

module.exports = mongoose.model('PharaohCurseReview', PharaohCurseReviewSchema, 'pharaohCurseReviews');