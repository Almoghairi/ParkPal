const mongoose = require('mongoose');

const TicketSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    numberOfTickets: {
        type: Number,
        required: true,
        min: 1
    }
});

module.exports = mongoose.model('Ticket', TicketSchema);