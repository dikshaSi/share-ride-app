
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const cancelRoutes = require('./routes/CancelRoutes');
require('dotenv').config();

const rideRoutes = require('./routes/rideRoutes'); 

const app = express();


app.use(cors());
app.use(express.json());


connectDB();


app.use('/api', rideRoutes);

app.use('/api', cancelRoutes);


const PORT = process.env.PORT || 5050;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

