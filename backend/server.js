const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
require('dotenv').config();

connectDB();
const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/courses', require('./routes/courseRoutes'));

app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`));
