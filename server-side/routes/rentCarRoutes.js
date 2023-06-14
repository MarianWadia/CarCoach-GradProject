const express = require('express');
const pool = require('../db');
const dotenv = require('dotenv');

dotenv.config();

const router = express.Router();


router.post('/car-rent/:id?/:car_id', async (req, res) => {
    const { name, phone, email, address, start_time, end_time, pickup_location, return_location, payment_method} = req.body;
    const user_id = req.params.id || null;
    const {car_id} = req.params
    try {
      if(user_id==null){
        res.json({unauthorizedMessage: "You should Login First. If You Don't have an account Signup Now!"});
      }else{
        const result = await pool.query(
          'INSERT INTO renters (user_id, name, phone, email, address) VALUES ($1, $2, $3, $4, $5) RETURNING id',
         [user_id,name, phone, email, address]
        );
        const renter_id =  result.rows[0].id;
        const result2 = await pool.query(
            'INSERT INTO rental_reservations (car_id, renter_id, start_time, end_time, pickup_location, return_location, payment_method, reservation_time) VALUES ($1, $2, $3, $4, $5, $6, $7, CURRENT_TIMESTAMP) RETURNING id',
            [car_id, renter_id, start_time, end_time, pickup_location, return_location, payment_method]);
        res.status(201).json({doneMessage: "We will contact you back shortly!"});
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });


  router.get("/car-rent", async (req, res)=>{
    try {
        const result = await pool.query(`SELECT * FROM rental_reservations`);
        const response = result.rows;
        res.status(200).json(response)
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred' });
    }
})


router.get("/car-rent/renters", async (req, res)=>{
  try {
      const result = await pool.query(`SELECT * FROM renters`);
      const response = result.rows;
      res.status(200).json(response)
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'An error occurred' });
  }
})

module.exports = router;