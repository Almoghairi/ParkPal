const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const Review = require('../models/CryZoneXReview');
const User = require('../models/userSchema');

// GET all reviews
router.get('/', async (req, res) => {
  try {
    const reviews = await Review.find()
      .populate('userId', 'name')
      .sort({ _id: -1 });
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch reviews' });
  }
});

// POST new review
router.post('/', async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Token missing' });

  try {
    const decoded = jwt.verify(token, 'secretKey');
    const user = await User.findById(decoded.userId);
    if (!user) return res.status(401).json({ error: 'Invalid user' });

    const { comment, rating, date } = req.body;

    const review = new Review({
      userId: user._id,
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