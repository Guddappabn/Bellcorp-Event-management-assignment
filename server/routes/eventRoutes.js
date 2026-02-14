const express = require('express');
const router = express.Router();
const Event = require('../models/Event');
const Registration = require('../models/Registration');
const { protect } = require('../middleware/authMiddleware');

// Get all events with filtering
router.get('/', async (req, res) => {
    try {
        const { search, category, location, tags, status, isVirtual, page = 1, limit = 12 } = req.query;
        let query = {};

        if (search) {
            query.name = { $regex: search, $options: 'i' };
        }
        if (category) {
            query.category = category;
        }
        if (location) {
            query.location = { $regex: location, $options: 'i' };
        }
        if (tags) {
            query.tags = { $in: tags.split(',') };
        }
        if (status) {
            query.status = status;
        }
        if (isVirtual !== undefined) {
            query.isVirtual = isVirtual === 'true';
        }
        if (req.query.date) {
            query.date = { $gte: new Date(req.query.date) };
        }

        const skip = (page - 1) * limit;
        const events = await Event.find(query)
            .populate('organizer', 'name email')
            .sort({ date: 1 })
            .skip(skip)
            .limit(parseInt(limit));
            
        const total = await Event.countDocuments(query);
        
        res.json({
            events,
            pagination: {
                currentPage: parseInt(page),
                totalPages: Math.ceil(total / limit),
                totalEvents: total,
                hasNext: skip + events.length < total
            }
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get User Registrations (Dashboard)
router.get('/my-registrations', protect, async (req, res) => {
    try {
        const registrations = await Registration.find({ user: req.user._id }).populate('event');
        res.json(registrations);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get single event
router.get('/:id', async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        if (event) {
            res.json(event);
        } else {
            res.status(404).json({ message: 'Event not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Create Event (Protected)
router.post('/', protect, async (req, res) => {
    try {
        const eventData = {
            ...req.body,
            organizer: req.user._id
        };
        const event = new Event(eventData);
        const createdEvent = await event.save();
        res.status(201).json(createdEvent);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Update Event (Protected - Only organizer can update)
router.put('/:id', protect, async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }
        
        if (event.organizer.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Not authorized to update this event' });
        }
        
        const updatedEvent = await Event.findByIdAndUpdate(
            req.params.id, 
            req.body, 
            { new: true, runValidators: true }
        );
        res.json(updatedEvent);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Cancel Event (Protected - Only organizer can cancel)
router.put('/:id/cancel', protect, async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }
        
        if (event.organizer.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Not authorized to cancel this event' });
        }
        
        event.status = 'cancelled';
        await event.save();
        
        // Notify all registered users
        await Registration.find({ event: req.params.id }).populate('user');
        
        res.json({ message: 'Event cancelled successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Register for an event
router.post('/:id/register', protect, async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);

        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }

        if (event.availableSeats <= 0) {
            return res.status(400).json({ message: 'Event is full' });
        }

        const alreadyRegistered = await Registration.findOne({
            user: req.user._id,
            event: req.params.id
        });

        if (alreadyRegistered) {
            return res.status(400).json({ message: 'User already registered' });
        }

        const registration = new Registration({
            user: req.user._id,
            event: req.params.id
        });

        await registration.save();

        event.availableSeats -= 1;
        await event.save();

        res.status(201).json({ message: 'Registration successful' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Cancel Registration
router.delete('/:id/cancel', protect, async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }

        const registration = await Registration.findOneAndDelete({
            user: req.user._id,
            event: req.params.id
        });

        if (!registration) {
            return res.status(400).json({ message: 'Registration not found' });
        }

        event.availableSeats += 1;
        await event.save();

        res.json({ message: 'Registration cancelled successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
