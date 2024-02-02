const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
const port = process.env.PORT || 3000;

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Configure proxy middleware with '/proxy' route
app.use('/proxy', (req, res, next) => {
    const targetURL = req.query.url || 'https://www.google.com';
    createProxyMiddleware({ target: targetURL, changeOrigin: true })(req, res, next);
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
