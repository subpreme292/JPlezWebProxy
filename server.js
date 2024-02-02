const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static('public'));

app.use('/proxy', createProxyMiddleware({ target: 'https://www.google.com', changeOrigin: true }));

// Handle search route
app.get('/search', (req, res) => {
    const searchQuery = req.query.q;
    res.redirect(`/proxy?q=${encodeURIComponent(searchQuery)}`);
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
