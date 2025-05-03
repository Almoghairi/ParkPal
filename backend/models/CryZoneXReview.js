const mongoose = require('mongoose');

const CryZoneXReviewSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  comment: String,
  rating: Number,
  date: String,
});

module.exports = mongoose.model('CryZoneXReview', CryZoneXReviewSchema, 'cryZoneXReviews');