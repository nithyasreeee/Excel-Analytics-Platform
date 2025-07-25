const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const authRoutes = require('./routers/authRoutes');
const excelRoutes = require('./routers/excelRoutes');
const analyticsRoutes = require('./routers/analyticsRoutes');
const cors = require('cors');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/user', authRoutes);
app.use('/api/excel', excelRoutes);
app.use('/api/analytics', analyticsRoutes);

// Test route for Postman
app.get('/api/test', (_req, res) => {
  res.send('Postman is running on port 5000');
});

// Test route to add sample user
app.post('/api/test/user', async (req, res) => {
  try {
    const User = require('./models/User');
    const bcrypt = require('bcryptjs');
    
    const hashedPassword = await bcrypt.hash('test123', 10);
    const testUser = await User.create({
      name: 'Test User',
      email: 'test@example.com',
      password: hashedPassword
    });
    
    res.json({ message: 'Test user created', user: testUser });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DB Connect
mongoose.connect("mongodb://127.0.0.1:27017/excelAnalytics")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));


// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${5000}`));
