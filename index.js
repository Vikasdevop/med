require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

connectDB();

// // Basic route
// app.get('/', (req, res) => {
//     res.send('Hello, Express!');
// });

// defining routes
app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'public', 'login', 'login.html'));
  
});

app.get('/login.css', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'public', 'login', 'login.css'));
});

app.get('/login.js', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'public', 'login', 'login.js'));
});

app.get('/register', (req, res) => {
res.sendFile(path.join(__dirname, 'frontend', 'public', 'register', 'register.html'));
});


app.get('/register.css', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'public', 'register', 'register.css'));
});

app.get('/register.js', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'public', 'register', 'register.js'));
});

app.use(express.static('public'));

// Start the server
app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
});
