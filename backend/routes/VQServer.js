const express = require('express');
const rateLimit = require('express-rate-limit');
const VQSchema = require('../models/VQSchema');


const router = express.Router();

// Rate limiter middleware
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 1000
});
router.use('/join', limiter);

// POST /api/vq/join
router.post('/join', async (req, res) => {
  try {
    const { gameName, visitor,numberOfPeople } = req.body;
    const queueLength = await VQSchema.countDocuments({
      gameName,
      status: 'waiting'
    });
    
    const existing = await VQSchema.findOne({
      'visitor.name': visitor.name,
      gameName,
      status: 'waiting'
    });
    if (existing) return res.status(201).json({ error: 'You are already in queue' });
    

    const estimatedWaitInMs = (queueLength) * 5 * 60 * 1000 === 0 ? 60 * 1000: (queueLength) * 5 * 60 * 1000; // +1 for this visitor

    const entry = new VQSchema({
      gameName,
      visitor,
      numberOfPeople,
      endTime: new Date(Date.now() + estimatedWaitInMs)
    });
    await entry.save();

    res.status(201).json({
      token: entry.token,
      queuePosition: entry.queuePosition,
      numberOfPeople:entry.numberOfPeople,
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
// DELETE /api/vq/quit/:token
router.delete('/quit/:token', async (req, res) => {
  try {
    const { userId } = req.body;
    const entry = await VQSchema.findOne({ token: req.params.token });

    if (!entry) return res.status(404).json({ error: 'Queue entry not found' });

    if (entry.visitor.name !== userId) {
      return res.status(403).json({ error: 'Unauthorized quit attempt' });
    }

    await entry.deleteOne();

    res.status(200).json({ message: 'Successfully quit queue' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error during quit' });
  }
});

// GET /api/vq/user/:userId
router.get('/user/:userId', async (req, res) => {
  try {
    const entry = await VQSchema.findOne({
      'visitor.name': req.params.userId,
      status: 'waiting'
    });

    if (!entry) return res.status(404).json({ inQueue: false });

    res.json({
      inQueue: true,
      gameName: entry.gameName // From your schema, this is a string
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});


module.exports = router;
