const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express();
const port = process.env.PORT || 3000;

// CORS configuration
const corsOptions = {
    origin: [
        'https://dcddxy.github.io',
        'http://localhost:3000',
        'http://127.0.0.1:5500',
        'http://localhost:5500',
        'file://'  // Allow local file access during development
    ],
    methods: ['GET'],
    optionsSuccessStatus: 200,
    credentials: true
};

app.use(cors(corsOptions));

// Add logging middleware
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
    next();
});

app.get('/api/centers', async (req, res) => {
    try {
        console.log('Fetching data from JKM API...');
        const response = await axios.get('https://infobencanajkmv2.jkm.gov.my/api/pusat-buka.php?a=0&b=0');
        
        if (!response.data) {
            console.error('No data received from JKM API');
            return res.status(404).json({ error: 'No data received from source' });
        }

        console.log(`Data fetched successfully. Records: ${Array.isArray(response.data) ? response.data.length : 'Not an array'}`);
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching data:', error.message);
        res.status(500).json({ 
            error: 'Error fetching data',
            message: error.message,
            timestamp: new Date().toISOString()
        });
    }
});
