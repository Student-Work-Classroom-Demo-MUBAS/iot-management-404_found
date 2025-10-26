const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

// Set EJS as the view engine
app.set('view engine', 'ejs');

// Tell Express where to find the .ejs files (inside public/views)
app.set('views', path.join(__dirname, 'public', 'views'));

// Serve static files from /public
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.get('/', (req, res) => {
    res.render('dashboard'); // Looks for dashboard.ejs inside /public/views/
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
