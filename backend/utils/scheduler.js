const schedule = require('node-schedule');
const VQSchema = require('../models/VQSchema');

function initScheduler() {
  schedule.scheduleJob('0 4 * * *', async () => {
    const expired = await VQSchema.updateMany(
      { endTime: { $lt: new Date() }, status: { $ne: 'expired' } },
      { status: 'expired' }
    );
    console.log(`Marked ${expired.modifiedCount} entries as expired`);
  });
}
module.exports = { initScheduler };