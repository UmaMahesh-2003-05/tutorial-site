require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const tutorialRoutes = require('./routes/tutorialRoutes');
const authRoutes = require("./routes/authRoutes");
const contactRoutes = require('./routes/contactRoutes');
const cookieParser = require('cookie-parser');

const app = express();

app.use(cors({
  //origin: 'http://localhost:3000',
  origin: 'https://tutorial-site-1.onrender.com',
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());
app.use("/api", authRoutes);
app.use('/api', contactRoutes);
app.use('/api/tutorials', tutorialRoutes);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected!'))
  .catch(err => console.log(err));

// Simple route
app.get('/', (req, res) => {
  res.send('Tutorial Platform Backend Running!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
