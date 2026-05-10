const express = require('express');
const cors = require('cors');
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

// Middleware
app.use(cors());
app.use(express.json());

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

const db = require('./config/db');

const PORT = process.env.PORT || 5000;
app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);
  try {
    const res = await db.query('SELECT NOW()');
    console.log('Database connected successfully:', res.rows[0].now);
  } catch (err) {
    console.error('Database connection failed:', err.message);
  }
});
