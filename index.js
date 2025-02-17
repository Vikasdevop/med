require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
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

// // Routes for serving static files
// app.get('/login', (req, res) => {
//   res.sendFile(path.join(__dirname, 'frontend', 'public', 'login', 'login.html'));
// });

// app.get('/login.css', (req, res) => {
//   res.sendFile(path.join(__dirname, 'frontend', 'public', 'login', 'login.css'));
// });

// app.get('/login.js', (req, res) => {
//   res.sendFile(path.join(__dirname, 'frontend', 'public', 'login', 'login.js'));
// });

// app.get('/register', (req, res) => {
//   res.sendFile(path.join(__dirname, 'frontend', 'public', 'register', 'register.html'));
// });

// app.get('/register.css', (req, res) => {
//   res.sendFile(path.join(__dirname, 'frontend', 'public', 'register', 'register.css'));
// });

// app.get('/register.js', (req, res) => {
//   res.sendFile(path.join(__dirname, 'frontend', 'public', 'register', 'register.js'));
// });

// // Register route
// app.post('/register', async (req, res) => {
//   const { name, username, phone, email, password, confirmPassword, age, Address, pincode } = req.body;

//   // Basic validation
//   if (!name || !username || !email || !password || !confirmPassword) {
//     return res.status(400).send('All fields are required');
//   }

//   if (password !== confirmPassword) {
//     return res.status(400).send('Passwords do not match');
//   }

//   try {
//     const newCustomer = new Customer({ name, username, phone, email, password, confirmPassword, age, Address, pincode });
//     await newCustomer.save();
//     res.status(201).send('Customer created successfully');
//     console.log('Customer created successfully');
//   } catch (error) {
//     console.error('Error in creating customer:', error);
//     res.status(500).send(`Error in creating customer: ${error.message}`);
//   }
// });

// Import and use auth routes
const LoginAuthRoutes = require('./routes/LoginRoutes/auth');
app.use('/api/auth', LoginAuthRoutes);

const adminAuthRoutes = require('./routes/AdminRoutes/auth');
app.use('/api/auth', adminAuthRoutes);

const customerAuthRoutes = require('./routes/CustomerRoutes/auth');
app.use('/api/auth', customerAuthRoutes);

const medicalStoreAuthRoutes = require('./routes/MedicalStoreRoutes/auth');
app.use('/api/auth', medicalStoreAuthRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});