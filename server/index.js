const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const authRoutes = require('./routes/auth.routes');
const tripRoutes = require('./routes/trip.routes');
const sectionRoutes = require('./routes/section.routes');
const expenseRoutes = require('./routes/expense.routes');
const checklistRoutes = require('./routes/checklist.routes');
const noteRoutes = require('./routes/note.routes');
const cityRoutes = require('./routes/city.routes');
const adminRoutes = require('./routes/admin.routes');
const userRoutes = require('./routes/user.routes');
const errorMiddleware = require('./middleware/error.middleware');

const app = express();

// Security Middleware
app.use(helmet());
app.use(cors({
  origin: ['https://travel-loop-iota.vercel.app', 'https://travel-loop-eta.vercel.app'],
  credentials: true
}));
app.use(express.json());


// Global Rate Limiting
const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 1000, // Increased for 4+ team members
  message: { message: 'Too many requests, please try again later.' }
});

// Stricter Auth Rate Limiting
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 500, // Increased for generous testing
  message: { message: 'Too many auth attempts, please try again later.' }
});

app.use('/api/', globalLimiter);
app.use('/api/auth/', authLimiter);

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/trips', tripRoutes);
app.use('/api/sections', sectionRoutes);
app.use('/api/expenses', expenseRoutes);
app.use('/api/checklist', checklistRoutes);
app.use('/api/notes', noteRoutes);
app.use('/api/cities', cityRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/users', userRoutes);

// Error Handler
app.use(errorMiddleware);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
