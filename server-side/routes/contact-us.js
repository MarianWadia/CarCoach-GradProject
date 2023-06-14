const express = require('express');
const router = express.Router();
const pool = require('../db');

router.post('/contact-us/:id?', async (req, res) => {
  const { name, email, message } = req.body;
  const user_id = req.params.id || null;
  try {
    if(user_id==null){
      res.json({unauthorizedMessage: "You should Login First. If You Don't have an account Signup Now!"});
    }else{
      const data = await pool.query(
        'INSERT INTO contacts (user_id, name, email, message, message_timestamp) VALUES ($1, $2, $3, $4, CURRENT_TIMESTAMP)',
       [user_id, name, email, message]
      );
      res.status(201).json({doneMessage: "We will contact you back shortly!"});
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get("/contact-us", async (req, res)=>{
  try {
      const result = await pool.query(`SELECT * FROM contacts`);
      const response = result.rows;
      res.status(200).json(response)
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'An error occurred' });
  }
})


module.exports = router;