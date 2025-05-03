const { initScheduler } = require('./utils/scheduler');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const authRoutes = require('./routes/auth');
const forgottenAsylumReviewRoutes = require('./routes/forgottenAsylumReviewRoute');
const virtualQRoutes = require('./routes/VQServer');
const pharaohReviewRoutes = require('./routes/pharaohCurseReviewRoute');
const infernoRoutes = require('./routes/infernoSpiralReviewRoute');
const tempestRoutes = require('./routes/tempestWrathReviewRoute');
const cryZoneRoutes = require('./routes/cryZoneXReviewRoute');

const app = express();
app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET','POST','PUT','DELETE','OPTIONS'],
  credentials: true
}));
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

app.use('/api/auth', authRoutes);
app.use('/api/forgotten-asylum', forgottenAsylumReviewRoutes);
app.use('/api/vq', virtualQRoutes);
app.use('/api/pharaoh-curse', pharaohReviewRoutes);
app.use('/api/inferno-spiral', infernoRoutes);
app.use('/api/tempest-wrath', tempestRoutes);
app.use('/api/cryzone-x', cryZoneRoutes);

initScheduler();

app.get("/", (req, res) => {
  res.send("API is running");
});

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
