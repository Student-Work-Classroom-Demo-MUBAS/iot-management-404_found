const express = require('express');
const router = express.Router();
const pool = require('../util/db');

/**
 * @swagger
 * /api/readings:
 *   get:
 *     summary: Get all sensor readings
 *     responses:
 *       200:
 *         description: List of sensor readings
 */
router.get('/', async (req, res) => {
  const [rows] = await db.query(`
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
 *     responses:
 *       200:
 *         description: Latest readings
 */
router.get('/latest', async (req, res) => {
  const [rows] = await db.query(`
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
  const { sensor_id, reading_value } = req.body;
  if (!sensor_id || reading_value === undefined) {
    return res.status(400).json({ error: 'sensor_id and reading_value are required' });
  }

  await db.query(
    'INSERT INTO sensor_readings (sensor_id, reading_value) VALUES (?, ?)',
    [sensor_id, reading_value]
  );
  res.status(201).json({ message: 'Reading added' });
});

module.exports = router;