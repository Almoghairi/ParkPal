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
  schedule.scheduleJob('*/1 * * * *', async () => {
    try {
      const result = await VQSchema.deleteMany({
        endTime: { $lt: new Date() },
        status: 'waiting'
      });
      if (result.deletedCount > 0) {
        console.log(`[Scheduler] Deleted ${result.deletedCount} expired queue entries`);
      }
    } catch (err) {
      console.error('[Scheduler] Error cleaning expired queues:', err);
    }
  });
}
module.exports = { initScheduler };