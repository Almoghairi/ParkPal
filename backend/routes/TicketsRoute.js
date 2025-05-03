const express = require('express');
const router = express.Router();
const Ticket = require('../models/TicketsSchema');

// POST route to create a new ticket
router.post('/', async (req, res) => {
    try {
        const { userId, numberOfTickets } = req.body;

        if (!userId || !numberOfTickets) {
            return res.status(400).json({ message: 'User ID and number of tickets are required.' });
        }

        const newTicket = new Ticket({
            userId,
            numberOfTickets
        });

        // Save the ticket to the database
        const savedTicket = await newTicket.save();

        res.status(201).json({ message: 'Ticket created successfully.', ticket: savedTicket });
    } catch (error) {
        console.error('Error creating ticket:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
});

module.exports = router;