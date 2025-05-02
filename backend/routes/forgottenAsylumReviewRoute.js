const express = require('express');
const router = express.Router();
const Review = require('../models/ForgottenAsylumReview');
const User = require('../models/userSchema');
const verifyToken = require('../middleware/authMiddleware');

// GET all reviews
router.get('/', async (req, res) => {
  try {
    const reviews = await Review.find().populate('userId', 'name').sort({ _id: -1 });
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch reviews' });
  }
});

// POST a new review — requires login
router.post('/', verifyToken, async (req, res) => {
  try {
    const { comment, rating, date } = req.body;
    const userId = req.userId; // from token

    const review = new Review({
      userId,
      comment,
      rating,
      date,
    });

    await review.save();

    const populatedReview = await Review.findById(review._id).populate('userId', 'name');
    res.status(201).json(populatedReview);

  } catch (err) {
    res.status(400).json({ error: 'Failed to add review' });
  }
});

module.exports = router;