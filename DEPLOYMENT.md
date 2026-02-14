# 🚀 Event Discovery Platform - Deployment Guide

## 📋 Overview

A full-stack event discovery and registration platform built with React, Node.js, Express, and MongoDB.

## 🏗️ Architecture

### **Frontend (React + Vite + Tailwind CSS)**
- **Tech Stack**: React 19, Vite 7, Tailwind CSS 4, React Router 7
- **Features**: Event discovery, search/filtering, user authentication, dashboard
- **Deployment**: Vercel (static hosting)

### **Backend (Node.js + Express + MongoDB)**
- **Tech Stack**: Node.js, Express 4, Mongoose 8, JWT authentication
- **Features**: RESTful API, event management, user registration, protected routes
- **Deployment**: Render (server hosting)

## 🌐 Deployment Options

### **Option 1: Vercel + Render (Recommended)**
Deploy frontend to Vercel and backend to Render for separate scaling.

### **Option 2: Combined Deployment**
Deploy both frontend and backend together on platforms like Railway.

## 📝 Environment Variables Setup

### **Frontend (.env)**
```env
VITE_API_BASE_URL=https://your-backend-url.onrender.com
```

### **Backend (.env)**
```env
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/eventapp?retryWrites=true&w=majority
JWT_SECRET=your-super-secret-jwt-key
PORT=5000
```

## 🔧 Deployment Steps

### **Frontend Deployment (Vercel)**
1. **Install Vercel CLI**: `npm i -g vercel`
2. **Login**: `vercel login`
3. **Deploy**: `vercel --prod`
4. **Set Environment Variables**: In Vercel dashboard

### **Backend Deployment (Render)**
1. **Connect GitHub Repository**: Link your repo to Render
2. **Configure Service**: 
   - **Runtime**: Node
   - **Build Command**: `npm install && npm start`
   - **Health Check Path**: `/api/events`
3. **Set Environment Variables**: In Render dashboard
4. **Deploy**: Push to GitHub or use Render CLI

## 🗄️ Database Setup

### **MongoDB Atlas (Recommended)**
1. **Create Cluster**: Free tier on MongoDB Atlas
2. **Get Connection String**: Copy MongoDB SRV connection string
3. **Whitelist IP**: Add Render/Vercel IP to Atlas whitelist
4. **Update Environment Variables**: Use Atlas connection string

### **Local MongoDB**
```bash
# Install MongoDB Community
# Start service
net start MongoDB
```

## 🔍 API Endpoints

### **Authentication**
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile (protected)

### **Events**
- `GET /api/events` - Get all events (with pagination, search, filters)
- `GET /api/events/:id` - Get single event
- `POST /api/events` - Create event (protected)
- `PUT /api/events/:id` - Update event (protected, organizer only)
- `PUT /api/events/:id/cancel` - Cancel event (protected, organizer only)
- `POST /api/events/:id/register` - Register for event (protected)
- `DELETE /api/events/:id/cancel` - Cancel registration (protected)

### **User Dashboard**
- `GET /api/events/my-registrations` - Get user registrations (protected)

## 🎯 Features Implemented

### **✅ Authentication & Authorization**
- JWT-based authentication with secure password hashing
- Protected routes with middleware
- User registration and login
- Session management with localStorage

### **✅ Event Management**
- Full CRUD operations for events
- Event creation, updating, cancellation
- Organizer permissions validation
- Event status tracking (upcoming, ongoing, completed, cancelled)

### **✅ Enhanced Event Discovery**
- Advanced search with text matching (regex)
- Multi-criteria filtering (category, location, date, tags, status)
- Virtual/in-person event distinction
- Pagination for large datasets
- Real-time search with debouncing

### **✅ Registration System**
- Event registration with capacity management
- Duplicate registration prevention
- Registration cancellation
- Seat availability tracking

### **✅ User Dashboard**
- Comprehensive statistics (total events, upcoming, past, total spent)
- Visual analytics with icons and cards
- Upcoming/past event separation
- Interactive data visualization

### **✅ UI/UX Excellence**
- Responsive design for all screen sizes
- Loading states and skeleton screens
- Smooth transitions and micro-interactions
- Modern card-based layouts
- Professional color schemes and typography

## 📱 Mobile Responsiveness
- **Mobile-first design approach**
- Touch-friendly interfaces
- Optimized performance for mobile devices
- Adaptive layouts for different screen sizes

## 🔒 Security Features
- JWT token-based authentication
- Password hashing with bcrypt
- CORS configuration
- Input validation and sanitization
- SQL injection prevention
- XSS protection

## 📊 Performance Optimizations
- Efficient database queries with indexing
- Pagination for large datasets
- Debounced search inputs
- Lazy loading for images
- Optimized bundle sizes

## 🧪 Testing Strategy
- API endpoint testing with Postman/Insomnia
- Frontend component testing
- Integration testing for user flows
- Load testing for scalability

## 📈 Monitoring & Analytics
- Error tracking and logging
- Performance monitoring setup
- User engagement metrics
- API response time tracking

## 🔄 CI/CD Pipeline
- GitHub integration for automated deployments
- Environment-specific configurations
- Automated testing on push
- Rollback strategies

## 📞 Troubleshooting

### **Common Issues**
1. **Database Connection**: Check MongoDB URI and network
2. **CORS Issues**: Verify frontend URL in API calls
3. **Environment Variables**: Ensure all required variables are set
4. **Build Failures**: Check logs and dependency versions

### **Debug Mode**
```bash
# Frontend
npm run dev

# Backend
npm run dev
```

## 📧 Development Workflow

1. **Local Development**: Use MongoDB local for development
2. **Feature Branches**: Create separate branches for features
3. **Code Reviews**: Required before merging
4. **Testing**: Comprehensive testing before deployment
5. **Documentation**: Keep README and docs updated

## 🎉 Production Considerations

- Use MongoDB Atlas for production
- Enable HTTPS and security headers
- Implement rate limiting
- Set up monitoring and alerting
- Regular security audits
- Performance optimization
- Backup strategies

## 📞 Support & Maintenance

- Regular updates and security patches
- User feedback collection
- Performance monitoring
- Community engagement
- Bug bounty program (optional)

---

## 🚀 Quick Start Commands

```bash
# Clone and setup
git clone <repository-url>
cd event-discovery-experience
npm install

# Setup environment
cp frontend/.env.example frontend/.env
cp server/.env.example server/.env
# Edit .env files with your values

# Start development
npm run dev:all  # If you add this script
# Or start separately
cd server && npm start &
cd frontend && npm run dev &
```

## 📧 Scripts to Add

Add to `package.json` for convenience:

```json
{
  "scripts": {
    "dev:all": "concurrently \"npm run server\" \"npm run client\"",
    "server": "cd server && npm start",
    "client": "cd frontend && npm run dev",
    "build": "cd frontend && npm run build",
    "test": "npm run test"
  }
}
```

## 🎯 Success Metrics

Track these metrics post-deployment:
- User registration conversion rate
- Event discovery engagement
- API response times
- Error rates and types
- User retention and churn
- Performance scores

---

**📞 For deployment support, contact the development team or check the troubleshooting guide above.**

**Built with ❤️ using modern web technologies and best practices.**
