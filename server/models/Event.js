const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: Date, required: true },
    location: { type: String, required: true },
    category: { type: String, required: true },
    capacity: { type: Number, required: true },
    organizer: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    availableSeats: { type: Number },
    tags: [{ type: String }], // For flexible categorization
    imageUrl: { type: String, default: '' }, // Event image
    price: { type: Number, default: 0 }, // Event pricing
    isVirtual: { type: Boolean, default: false }, // Virtual/Online events
    status: { 
        type: String, 
        enum: ['upcoming', 'ongoing', 'completed', 'cancelled'], 
        default: 'upcoming' 
    }
}, {
    timestamps: true
});

EventSchema.pre('save', function (next) {
    if (this.isNew) {
        this.availableSeats = this.capacity;
    }
    next();
});

module.exports = mongoose.model('Event', EventSchema);
