const express = require('express');
const router = express.Router();
const pool = require('../util/db');
const authenticateToken = require('../middleware/authMiddleware');

/**
 * @swagger
 * /api/readings/get-all:
 *   get:
 *     summary: Get all sensor readings
 *     responses:
 *       200:
 *         description: List of sensor readings
 */
router.get('/get-all', async (req, res) => {
   const [rows] = await pool.query('SELECT * FROM sensor_readings ORDER BY timestamp DESC');

  res.json(rows);
});

/**
 * @swagger
 * /api/readings/latest:
 *   get:
 *     summary: Get the latest reading for each sensor
 *     responses:
 *       200:
 *         description: Latest readings
 */
router.get('/latest', async (req, res) => {
 const [rows] = await pool.query(`
    SELECT * FROM sensor_readings
    ORDER BY timestamp DESC
    LIMIT 3;
  `);

  console.log('Latest readings fetched:', rows);
  res.json(rows);
});

/**
 * @swagger
 * /api/readings:
 *   post:
 *     summary: Add a new sensor reading
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               sensor_id:
 *                 type: integer
 *               reading_value:
 *                 type: number
 *     responses:
 *       201:
 *         description: Reading added
 */
router.post('/', async (req, res) => {
     console.log('Received data:', req.body);
  const { sensor_id, reading_value } = req.body;
  if (!sensor_id || reading_value === undefined) {
    return res.status(400).json({ error: 'sensor_id and reading_value are required' });
  }

  await pool.query(
    'INSERT INTO sensor_readings (sensor_id, reading_value) VALUES (?, ?)',
    [sensor_id, reading_value]
  );
  res.status(201).json({ message: 'Reading added' });
});

module.exports = router;