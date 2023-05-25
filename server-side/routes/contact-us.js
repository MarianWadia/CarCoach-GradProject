const express = require('express');
const router = express.Router();
const pool = require('../db');

router.post('/contact-us', async (req, res) => {
  const { name, email, message } = req.body;

  try {
    const { rows } = await pool.query(
      'INSERT INTO contacts (name, email, message, message_timestamp) VALUES ($1, $2, $3, CURRENT_TIMESTAMP) RETURNING *',
     [name, email, message]
    );
    res.status(201).json(rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;