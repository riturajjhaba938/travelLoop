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
app.use(cors()); // In production, configure origin
app.use(express.json());

// Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use('/api/', limiter);

// Routes - Fixed Mounting to prevent doubled segments
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
