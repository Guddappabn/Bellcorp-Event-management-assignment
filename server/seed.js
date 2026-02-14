const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Event = require('./models/Event');

dotenv.config();

const events = [
    {
        name: "Tech Conference 2024",
        date: new Date('2024-12-15'),
        location: "New York, NY",
        description: "A gathering of tech enthusiasts.",
        category: "Technology",
        capacity: 100,
        availableSeats: 100
    },
    // ... (rest of events same as before, truncated for brevity but full list needed if I overwrite)
    {
        name: "Music Fest",
        date: new Date('2024-06-20'),
        location: "Austin, TX",
        description: "Live music from top bands.",
        category: "Music",
        capacity: 500,
        availableSeats: 500
    },
    {
        name: "Art Expo",
        date: new Date('2024-09-10'),
        location: "San Francisco, CA",
        description: "Showcasing modern art.",
        category: "Art",
        capacity: 50,
        availableSeats: 50
    },
    {
        name: "Coding Bootcamp Open House",
        date: new Date('2024-11-05'),
        location: "Remote",
        description: "Learn about our coding programs.",
        category: "Education",
        capacity: 200,
        availableSeats: 200
    },
    {
        name: "Startup Pitch Night",
        date: new Date('2025-01-20'),
        location: "Boston, MA",
        description: "Watch startups pitch to investors.",
        category: "Business",
        capacity: 80,
        availableSeats: 80
    },
    {
        name: "Wellness Retreat",
        date: new Date('2024-07-15'),
        location: "Sedona, AZ",
        description: "Relax and rejuvenate.",
        category: "Health",
        capacity: 30,
        availableSeats: 30
    },
    {
        name: "Culinary Workshop",
        date: new Date('2024-08-22'),
        location: "Chicago, IL",
        description: "Learn to cook Italian cuisine.",
        category: "Food",
        capacity: 20,
        availableSeats: 20
    },
    {
        name: "Film Festival",
        date: new Date('2024-10-30'),
        location: "Los Angeles, CA",
        description: "Screening independent films.",
        category: "Entertainment",
        capacity: 150,
        availableSeats: 150
    },
    {
        name: "Gaming Tournament",
        date: new Date('2024-12-05'),
        location: "Las Vegas, NV",
        description: "Competitive gaming event.",
        category: "Gaming",
        capacity: 200,
        availableSeats: 200
    },
    {
        name: "Science Fair",
        date: new Date('2024-05-15'),
        location: "Seattle, WA",
        description: "Innovative science projects.",
        category: "Science",
        capacity: 100,
        availableSeats: 100
    }
];

mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/eventapp', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(async () => {
        console.log('MongoDB Connected');
        await Event.deleteMany({});
        await Event.insertMany(events);
        console.log('Data Imported!');
        process.exit();
    })
    .catch(err => {
        console.error('Error connecting to MongoDB:', err.message);
        console.log('Ensure MongoDB is running locally or check your MONGO_URI in .env');
        process.exit(1);
    });
