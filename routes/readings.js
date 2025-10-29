const express = require('express');
const router = express.Router();
const pool = require('../util/db');
const authenticateToken = require('../middleware/authMiddleware');

/**
 * @swagger
 * /api/readings:
 *   get:
 *     summary: Get all sensor readings
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of sensor readings
 */
router.get('/get-all', authenticateToken, async (req, res) => {
  const [rows] = await pool.query(`
    SELECT sr.id, sr.sensor_id, s.sensor_name, s.sensor_type, sr.reading_value, sr.timestamp
    FROM sensor_readings sr
    JOIN sensors s ON sr.sensor_id = s.id
    ORDER BY sr.timestamp DESC
  `);
  res.json(rows);
});

/**
 * @swagger
 * /api/readings/latest:
 *   get:
 *     summary: Get the latest reading for each sensor
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Latest readings
 */
router.get('/latest', authenticateToken, async (req, res) => {
  const [rows] = await pool.query(`
    SELECT sr.id, sr.sensor_id, s.sensor_name, s.sensor_type, sr.reading_value, sr.timestamp
    FROM sensor_readings sr
    JOIN sensors s ON sr.sensor_id = s.id
    INNER JOIN (
      SELECT sensor_id, MAX(timestamp) AS latest
      FROM sensor_readings
      GROUP BY sensor_id
    ) latest_readings
    ON sr.sensor_id = latest_readings.sensor_id AND sr.timestamp = latest_readings.latest
    ORDER BY sr.timestamp DESC
  `);
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