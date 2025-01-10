require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

// Route imports
const authRoutes = require('./routes/authRoutes');
const blogRoutes = require('./routes/blogRoutes');
const userRoutes = require('./routes/userRoutes');

// Error handler middleware
const errorHandler = require('./middleware/errorHandler');

const app = express();

// Database Configuration
const connectDB = async () => {
  try {
    const dbURI = process.env.MONGODB_URI || "mongodb://localhost:27017/fedBlogs";
    await mongoose.connect(dbURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log("📚 MongoDB connected successfully");
  } catch (err) {
    console.log("❌ MongoDB connection error:", err);
    process.exit(1);
  }
};

// Connect to MongoDB
connectDB();

// Rate limiting configuration
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: {
    status: 'error',
    message: 'Too many requests from this IP, please try again after 15 minutes'
  }
});

// Security middleware
app.use(helmet({
  contentSecurityPolicy: process.env.NODE_ENV === 'production' ? undefined : false
}));

// Middleware setup
app.use(morgan('dev')); // Logging
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cors({
  origin: process.env.CORS_ORIGIN || '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(limiter);

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    timestamp: new Date(),
    uptime: process.uptime(),
    mongodb: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
  });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/users', userRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    status: 'error',
    message: `Route ${req.originalUrl} not found`
  });
});

// Global error handler
app.use(errorHandler);

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  console.error('💥 Uncaught Exception:', err);
  process.exit(1);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error('💥 Unhandled Rejection:', err);
  process.exit(1);
});

// Graceful shutdown
const gracefulShutdown = async (server) => {
  console.log('👋 Initiating graceful shutdown...');
  
  try {
    // Close server
    if (server) {
      await new Promise((resolve) => {
        server.close(resolve);
        console.log('🔒 HTTP server closed');
      });
    }

    // Close database connection
    await mongoose.connection.close(false);
    console.log('📑 MongoDB connection closed');
    
    process.exit(0);
  } catch (err) {
    console.error('❌ Error during graceful shutdown:', err);
    process.exit(1);
  }
};

// Handle termination signals
process.on('SIGTERM', () => gracefulShutdown(app));
process.on('SIGINT', () => gracefulShutdown(app));

module.exports = app;