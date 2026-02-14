const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const authRoutes = require('./routes/authRoutes');
const eventRoutes = require('./routes/eventRoutes');

const app = express();

app.use(cors());
app.use(express.json());

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/eventapp');
        console.log('MongoDB Connected');
    } catch (err) {
        console.error('Failed to connect to local MongoDB:', err.message);
        console.log('Attempting to start in-memory MongoDB...');
        try {
            const { MongoMemoryServer } = require('mongodb-memory-server');
            const mongod = await MongoMemoryServer.create();
            const uri = mongod.getUri();
            await mongoose.connect(uri);
            console.log('In-memory MongoDB Connected');
        } catch (memoryErr) {
            console.error('Failed to start in-memory MongoDB:', memoryErr.message);
            process.exit(1);
        }
    }

    // Seed Data
    const Event = require('./models/Event');
    const existingEvents = await Event.countDocuments();
    if (existingEvents === 0) {
        console.log('Seeding initial data...');
        const events = [
            // TECHNOLOGY
            {
                name: "Future Tech Summit 2025",
                description: "Join industry leaders to discuss AI, Blockchain, and the future of computing. Keynote speakers from top tech giants.",
                date: new Date('2025-03-15'),
                location: "San Francisco, CA",
                category: "Technology",
                capacity: 500,
                availableSeats: 120
            },
            {
                name: "React Developer Conference",
                description: "Deep dive into the React ecosystem. Workshops on Next.js, Remix, and advanced React patterns.",
                date: new Date('2025-04-10'),
                location: "New York, NY",
                category: "Technology",
                capacity: 300,
                availableSeats: 45
            },
            {
                name: "Cybersecurity World",
                description: "Comprehensive workshops on network security, ethical hacking, and data protection strategies.",
                date: new Date('2025-05-20'),
                location: "London, UK",
                category: "Technology",
                capacity: 400,
                availableSeats: 200
            },

            // MUSIC
            {
                name: "Summer Vibes Festival",
                description: "Three days of non-stop music featuring top indie and pop artists. Food trucks, art installations, and more.",
                date: new Date('2025-07-12'),
                location: "Austin, TX",
                category: "Music",
                capacity: 5000,
                availableSeats: 1540
            },
            {
                name: "Jazz & Blues Night",
                description: "An intimate evening of smooth jazz and soulful blues at the historic Blue Note club.",
                date: new Date('2025-02-28'),
                location: "Chicago, IL",
                category: "Music",
                capacity: 150,
                availableSeats: 12
            },
            {
                name: "Electronic Dreams",
                description: "A night of immersive electronic music and visual art. Featuring world-renowned DJs.",
                date: new Date('2025-08-05'),
                location: "Berlin, Germany",
                category: "Music",
                capacity: 2000,
                availableSeats: 800
            },

            // ART
            {
                name: "Modern Art Gallery Opening",
                description: "Exclusive preview of the new modern art collection. Meet the artists and enjoy complimentary wine and cheese.",
                date: new Date('2025-03-01'),
                location: "Paris, France",
                category: "Art",
                capacity: 200,
                availableSeats: 50
            },
            {
                name: "Digital Art & NFT Expo",
                description: "Explore the intersection of art and technology. diverse digital art displays and NFT workshops.",
                date: new Date('2025-04-15'),
                location: "Tokyo, Japan",
                category: "Art",
                capacity: 1000,
                availableSeats: 400
            },
            {
                name: "Street Art Tour",
                description: "Guided tour through the city's most iconic street art murals. Learn the stories behind the spray paint.",
                date: new Date('2025-06-10'),
                location: "Melbourne, Australia",
                category: "Art",
                capacity: 30,
                availableSeats: 5
            },

            // BUSINESS
            {
                name: "Global Startup Expo",
                description: "Connect with investors, founders, and innovators. The ultimate networking event for startups.",
                date: new Date('2025-09-10'),
                location: "Singapore",
                category: "Business",
                capacity: 1500,
                availableSeats: 600
            },
            {
                name: "Leadership Masterclass",
                description: "Intensive workshop for executives and aspiring leaders. Focus on emotional intelligence and strategic thinking.",
                date: new Date('2025-03-25'),
                location: "Boston, MA",
                category: "Business",
                capacity: 50,
                availableSeats: 8
            },

            // EDUCATION
            {
                name: "University Open Day",
                description: "Explore campus facilities, meet professors, and learn about scholarship opportunities.",
                date: new Date('2025-02-20'),
                location: "Cambridge, MA",
                category: "Education",
                capacity: 1000,
                availableSeats: 1000
            },
            {
                name: "EdTech Innovations 2025",
                description: "Discover the latest tools and technologies transforming the classroom experience.",
                date: new Date('2025-05-05'),
                location: "Toronto, Canada",
                category: "Education",
                capacity: 400,
                availableSeats: 150
            }
        ];

        await Event.insertMany(events);
        console.log('Database seeded with initial data');
    }
};

connectDB();

app.use('/api/auth', authRoutes);
app.use('/api/events', eventRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
