import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import VQSchema from '../Server2/schema/VQSchema.js';
import schedule from 'node-schedule';

dotenv.config();
const app = express();


app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 30
});

app.use('/api/vq/join', limiter);

await mongoose.connect("mongodb://localhost:27017/Game").then(() => console.log('MongoDB connected succesfully')).catch(err => console.error('MongoDB connection error:', err));


//join queue

app.post("/api/vq/join", async(req , res)=>{
    try{
        const { gameName, visitor } = req.body;
    
        const existing = await VQSchema.findOne({'visitor.phone': visitor.phone,gameName,status: 'waiting'});
        if(existing) return res.status(400).json({ error: 'You are already in queue' });

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
        } catch(error){
        console.error(error);
        res.status(500).json({error:'Server error'});
    }  
})

// chack status

app.get("/api/vq/status/:token", async(req , res)=>{

    try{
        const entry = await VQSchema.findOne({token: req.params.token});

        if (!entry) return res.status(404).json({ error: 'Invalid token' });
        const count = await VQSchema.countDocuments({
            gameName: entry.gameName,
            status: "waiting",
            queuePosition: {$lt: entry.queuePosition}
        });

        res.json({
            postion: count+1,
            status: entry.status,
            gameEnd: entry.endTime
        });

    }catch(error){
      res.status(500).json({ error: 'Server error' });
    }
});
app.get('/api/vq/all', async (req, res) => {
    try {
    const queues = await VQSchema.aggregate([
        { $match: { status: 'waiting' } },
        { 
          $group: { 
            _id: "$gameName",
            count: { $sum: 1 },
            averageWait: { $avg: "$queuePosition" }
          }
        }
    ]);
    
    res.json(queues);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});
// daily clean queue
export function initScheduler () {
  schedule.scheduleJob('0 4 * * *', async () => {
    const expired = await VQSchema.updateMany(
      { endTime: { $lt: new Date() }, status: { $ne: 'expired' } },
      { status: 'expired' }
    );
    console.log(`Marked ${expired.modifiedCount} entries as expired`);
  });
};
//middleware error
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Server Error!');
});
//react link
const corsOptions = {
  origin: 'http://localhost:3000', 
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));


export default app;