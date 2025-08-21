require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cityRoutes = require('./routes/city.routes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/', (req, res) => {
    res.send('API is running!');
});

// City routes
app.use('/api/v1/city', cityRoutes);

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});