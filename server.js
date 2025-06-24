
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
require('dotenv').config();

const rideRoutes = require('./routes/rideRoutes'); // ✅ Routes file

const app = express();

// ✅ Middleware
app.use(cors());
app.use(express.json());

// ✅ Connect to MongoDB
connectDB();

// ✅ Mount all routes at /api
app.use('/api', rideRoutes);

const PORT = process.env.PORT || 5050;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

