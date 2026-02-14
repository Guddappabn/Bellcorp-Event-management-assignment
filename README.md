# Bellcorp Event Management Application

A full-stack event discovery and registration platform built with React, Node.js, Express, and MongoDB.

## Features

- **User Authentication**: Register and login securely using JWT.
- **Event Discovery**: Browse events with search and filter capabilities (Category, Location).
- **Event Details**: View detailed information about events including capacity and location.
- **Registration**: Register for events with real-time seat tracking.
- **Dashboard**: Specialized user dashboard to view upcoming and past registrations.
- **Responsive Design**: Modern UI built with Tailwind CSS.

## Project Structure

```
root/
├── server/            # Backend (Node.js/Express)
│   ├── models/        # Mongoose Schemas
│   ├── routes/        # API Routes
│   ├── middleware/    # Auth Middleware
│   ├── server.js      # Entry Point
│   └── seed.js        # Data Seeder
├── frontend/          # Frontend (React + Vite)
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── context/
│   │   └── App.jsx
│   └── tailwind.config.js
└── README.md
```

## Getting Started

### Prerequisites

- Node.js installed
- MongoDB installed locally or a MongoDB Atlas URI

### 1. Setup Backend

1. Navigate to the `server` directory:
   ```bash
   cd server
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure Environment Variables:
   - Create a `.env` file in `server/` with:
     ```
     MONGO_URI=mongodb://127.0.0.1:27017/eventapp
     JWT_SECRET=your_jwt_secret
     PORT=5000
     ```
4. Seed the Database (Optional):
   ```bash
   npm run seed
   ```
5. Start the Server:
   ```bash
   npm run dev
   ```
   The backend will run on `http://localhost:5000`.

### 2. Setup Frontend

1. Navigate to the `frontend` directory:
   ```bash
   cd ../frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the Development Server:
   ```bash
   npm run dev
   ```
   The frontend will run on `http://localhost:5173`.

## Usage

1. Open `http://localhost:5173` in your browser.
2. Register a new account or login.
3. Browse events or use the search bar.
4. Click on an event to view details and register.
5. Check your Dashboard for your registered events.

## API Endpoints

- `GET /api/events`: Get all events (supports query params `search`, `category`, `location`).
- `GET /api/events/:id`: Get single event.
- `POST /api/auth/register`: Register user.
- `POST /api/auth/login`: Login user.
- `POST /api/events/:id/register`: Register for event (Auth required).
- `GET /api/events/my-registrations`: Get user registrations (Auth required).
