const express = require('express');
const authRoutes = require('./routes/auth');
const readingsRoutes = require('./routes/readings');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger');
const bodyParser = require ("body-parser");
const cors = require('cors');
  
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api/auth', authRoutes);
app.use('/api/readings', readingsRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


app.get('/login', (req, res) => {
  res.sendFile(__dirname + '/public/login.html');
});

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/login.html');
});


app.get('/signup', (req, res) => {
  res.sendFile(__dirname + '/public/signup.html');
});

app.post('/api/sensor', (req, res) => {
  console.log('Received data:', req.body);
  res.sendStatus(200);
});

app.get("/dashboard", (req, res) => {

 res.sendFile(__dirname + '/public/dashboard.html'); // 
});

app.listen(3000, () => console.log('Server running on port 3000'));
