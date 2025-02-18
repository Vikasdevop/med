require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const axios = require('axios');
const path = require('path');
const cors = require('cors');

const app = express();
app.use(express.json()); // Body parser

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'frontend', 'public')));

// Connect to MongoDB
connectDB();

// Import and use auth routes
const LoginAuthRoutes = require('./routes/LoginRoutes/auth');
app.use('/api/auth', LoginAuthRoutes);

const adminAuthRoutes = require('./routes/AdminRoutes/auth');
app.use('/api/auth', adminAuthRoutes);

const customerAuthRoutes = require('./routes/CustomerRoutes/auth');
app.use('/api/auth', customerAuthRoutes);

const medicalStoreAuthRoutes = require('./routes/MedicalStoreRoutes/auth');
app.use('/api/auth', medicalStoreAuthRoutes);

const apiAuthRoutes = require('./routes/APIRoutes/gstRoutes');
app.use('/api/auth', apiAuthRoutes);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});