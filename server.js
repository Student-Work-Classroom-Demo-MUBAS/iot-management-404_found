const express = require('express');
const path = require('path');
const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files from "public"
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.render('dashboard');
});

app.listen(3000, () => console.log('Server running at http://localhost:3000'));
