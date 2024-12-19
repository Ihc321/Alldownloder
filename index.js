const express = require('express');
const nayan = require('imon-videos-downloader'); // Ensure the correct package is used

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Utility function for URL validation
const isValidUrl = (url) => {
    const urlPattern = /^https?:\/\/.+/;
    return urlPattern.test(url);
};

// Route to handle media downloading
app.get('/dl', async (req, res) => {
    const url = req.query.url || '';

    // Validate the URL
    if (!isValidUrl(url)) {
        return res.status(400).json({ error: 'Invalid URL.' });
    }

    try {
        // Use the imon-media-downloader to fetch media data
        const data = await nayan.alldown(url);

        // Ensure data is valid
        if (!data || !data.data) {
            return res.status(404).json({ error: 'Media not found.' });
        }

        // Destructure and handle media URLs properly
        const { low, high, title } = data.data;

        if (!low || !high) {
            return res.status(404).json({ error: 'No media quality options found.' });
        }

        return res.json({ 
            developer: "F",
            devfb: "https://www.facebook.com/Imon.132233?mibextid=ZbWKwL",
            devwp: "wa.me/+8801318582357",
            status: "true",
            data: { title, low, high },
        }); 
         // Return media data as JSON response
    } catch (error) {
        console.error('Error fetching media:', error.message || error);
        return res.status(500).json({ error: 'Failed to download media.' });
    }
});

// Error Handling Middleware
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ error: 'Something went wrong!' });
});

// Start the Express server
app.listen(PORT, () => {
    console.log(Server running on port: ${PORT});
});
