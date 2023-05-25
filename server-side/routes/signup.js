const express = require('express');
const pool = require('../db');const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const router = express.Router();



router.post('/signup', async (req, res) => {
    try {
      const { firstName, lastName, email, password } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);
      const result = await pool.query('INSERT INTO users (first_name, last_name, email, password) VALUES ($1, $2, $3, $4) RETURNING id', [firstName, lastName, email, hashedPassword]);
      const id = result.rows[0].id;
      const token = jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1d' });
      res.status(201).json({ token });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'An error occurred' });
    }
  });

  module.exports = router;