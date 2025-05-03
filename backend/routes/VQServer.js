const express = require('express');
const rateLimit = require('express-rate-limit');
const VQSchema = require('../models/VQSchema');


const router = express.Router();

// Rate limiter middleware
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
});
router.use('/join', limiter);

// POST /api/vq/join
router.post('/join', async (req, res) => {
  try {
    const { gameName, visitor } = req.body;
    const existing = await VQSchema.findOne({
      'visitor.name': visitor.name,
      gameName,
      status: 'waiting'
    });
    if (existing) return res.status(400).json({ error: 'You are already in queue' });

    const entry = new VQSchema({
      gameName,
      visitor,
      endTime: new Date(Date.now() + 60 * 60 * 1000)
    });
    await entry.save();

    res.status(201).json({
      token: entry.token,
      queuePosition: entry.queuePosition,
      gameName: entry.gameName,
      expires: entry.endTime
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// GET /api/vq/status/:token
router.get('/status/:token', async (req, res) => {
  try {
    const entry = await VQSchema.findOne({ token: req.params.token });
    if (!entry) return res.status(404).json({ error: 'Invalid token' });

    const count = await VQSchema.countDocuments({
      gameName: entry.gameName,
      status: 'waiting',
      queuePosition: { $lt: entry.queuePosition }
    });

    res.json({
      position: count + 1,
      status: entry.status,
      gameEnd: entry.endTime
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// GET /api/vq/all
router.get('/all', async (req, res) => {
  try {
    const queues = await VQSchema.aggregate([
      { $match: { status: 'waiting' } },
      {
        $group: {
          _id: '$gameName',
          count: { $sum: 1 },
          averageWait: { $avg: '$queuePosition' }
        }
      }
    ]);
    res.json(queues);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
