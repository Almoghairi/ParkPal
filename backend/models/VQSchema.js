// const mongoose = require("mongoose");
// const PARK_GAMES = ['The Forgotten Asylum', 'The Tempest’s Wrath','Inferno Spiral','CryzoneX','Pharaoh’s Curse'];
// const VQSchema= new mongoose.Schema({
//     gameName: {
//         type: String,
//         required: true,
//         enum: PARK_GAMES
//     },
//     visitor: {
//         name: {
//           type: String,
//           required: true,
//           trim: true,
//           maxlength: 50
//         }
//     },
//     queuePosition: {
//         type: Number,
//         min: 1
//     },
//     numberOfPeople:{
//        type:Number,
//       min:1
//     },
//     startTime: {
//       type: Date,
//       default: Date.now
//     },
//       endTime: {
//         type: Date,
//         required: true
//     },
//     status: {
//         type: String,
//         enum: ['waiting', 'in-ride', 'completed', 'expired'],
//         default: 'waiting'
//       },
//       token: {
//         type: String,
//         unique: true,
//         default: () => Math.random().toString(36).substr(2, 9)
//     }
// });
// VQSchema.pre('save', async function(next) {
//     if (!this.queuePosition) {
//       const count = await this.constructor.countDocuments({
//         gameName: this.gameName,
//         status: 'waiting'
//       });
//       this.queuePosition = count + 1;
//     }
//     next();
// });


// module.exports=mongoose.model("VQSchema", VQSchema);
const mongoose = require("mongoose");
const PARK_GAMES = ['The Forgotten Asylum', 'The Tempest’s Wrath','Inferno Spiral','CryzoneX','Pharaoh’s Curse'];
const VQSchema= new mongoose.Schema({
    gameName: {
        type: String,
        required: true,
        enum: PARK_GAMES
    },
    visitor: {
        name: {
          type: String,
          required: true,
          trim: true,
          maxlength: 50
        }
    },
    
    queuePosition: {
        type: Number,
        min: 1
      },
      startTime: {
        type: Date,
        default: Date.now
      },
      endTime: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        enum: ['waiting', 'in-ride', 'completed', 'expired'],
        default: 'waiting'
      },
      token: {
        type: String,
        unique: true,
        default: () => Math.random().toString(36).substr(2, 9)
    }
});
VQSchema.pre('save', async function(next) {
    if (!this.queuePosition) {
      const count = await this.constructor.countDocuments({
        gameName: this.gameName,
        status: 'waiting'
      });
      this.queuePosition = count + 1;
    }
    next();
});
module.exports=mongoose.model("VQSchema", VQSchema);