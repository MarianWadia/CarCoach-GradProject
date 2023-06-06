const express = require('express');
const pool = require('../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const router = express.Router();

router.post('/signup', async (req, res) => {
    try {
      const { firstName, lastName, email, password } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);
      const result = await pool.query('INSERT INTO users (first_name, last_name, email, password, token) VALUES ($1, $2, $3, $4, $5) RETURNING *', [firstName, lastName, email, hashedPassword, "data"]);
      const id = result.rows[0].id;
      console.log(id)
      const token = jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1d' });
      console.log(process.env.JWT_SECRET);
      const insertToken = await pool.query('UPDATE users SET token = $1 WHERE id = $2', [token, id]);
      res.status(201).json({ token, id });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'An error occurred' });
    }
  });

  router.post('/signin', async (req, res) => {
    try {
      const { email, password } = req.body;
      const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
      const user = result.rows[0];
      if (!user) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }
      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }
      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1d' });
      console.log(process.env.JWT_SECRET);
      const updateToken = await pool.query('UPDATE users SET token = $1 WHERE id = $2', [token, user.id]);
      res.json({ token });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'An error occurred' });
    }
  });


  // signOut the user and verify its token if valid
    // function verifyToken(req, res, next) {
    //   const token = req.headers['authorization'];
    
    //   if (!token) {
    //     return res.status(401).send('Unauthorized request');
    //   }
    
    //   try {
    //     const decoded = jwt.verify(token, process.env.JWT_SECRET, { ignoreExpiration: true });
    //     req.user = decoded;
    //     console.log(process.env.JWT_SECRET);
    //     console.log(decoded)
    //     next();
    //   } catch (error) {
    //     console.log(token)
    //     return res.status(401).json({ error: 'Invalid token', message: error.message });
    //   }
    // }
    function verifyToken(req, res, next) {
      
      const token = req.headers.authorization.replace('Bearer ', '');
      
      if (!token) {
        return res.status(401).send('Unauthorized request');
      }
      
      console.log('Before jwt.verify()');
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded.id;
        next();
      } catch (error) {
        console.log(token)
        console.log(error)
        return res.status(401).json({ error: 'Invalid token', message: error.message });
      }
      console.log('After jwt.verify()');
    }
    router.post('/signout', verifyToken, (req, res) =>{
      res.status(200).send('User signed out successfully');
    })


module.exports = router;