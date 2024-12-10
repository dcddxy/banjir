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
        'http://localhost:5500'
    ],
    methods: ['GET'],
    optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

app.get('/api/centers', async (req, res) => {
    try {
        const response = await axios.get('https://infobencanajkmv2.jkm.gov.my/api/pusat-buka.php?a=0&b=0');
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching data' });
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
