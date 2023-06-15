const express = require('express');
const pool = require('../db');
const dotenv = require('dotenv');

dotenv.config();

const router = express.Router();


router.post('/tutor-reserve/:id?/:tutor_id', async (req, res) => {
    const { name, phone, email, payment_method, package_price } = req.body;
    const user_id = req.params.id || null;
    const {tutor_id} = req.params
    try {
      if(user_id==null){
        res.json({unauthorizedMessage: "You should Login First. If You Don't have an account Signup Now!"});
      }else{
        const dataIsStudent = `UPDATE users SET is_student = true WHERE user_id =${user_id}`;
        const result = await pool.query(
          'INSERT INTO tutor_reservations (user_id, tutor_id, name, phone, email, payment_method, package_price, reservation_time) VALUES ($1, $2, $3, $4, $5, $6, $7, CURRENT_TIMESTAMP) RETURNING id',
         [user_id, tutor_id ,name, phone, email, payment_method, package_price]
        );
        const reservation_id =  result.rows[0].id;
        const result2 = await pool.query(
            'INSERT INTO students (reservation_id) VALUES ($1) RETURNING id',
            [reservation_id]);
        res.status(201).json({doneMessage: "We will contact you back shortly!"});
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

// get all reservations by admin
  router.get("/tutor-reserve", async (req, res)=>{
    try {
        const result = await pool.query(`SELECT * FROM tutor_reservations`);
        const response = result.rows;
        res.status(200).json(response)
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred' });
    }
})

// get all students by admin
router.get("/tutor-reserve/students", async (req, res)=>{
    try {
        const result = await pool.query(`SELECT * FROM students`);
        const response = result.rows;
        res.status(200).json(response)
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred' });
    }
})

  // delete tutor reservation by admin
  router.delete("/tutor-reserve/:reservation_id", async (req, res)=>{
    try {
      const {reservation_id} = req.params;
        const result = await pool.query(`DELETE FROM tutor_reservations WHERE id=${reservation_id}`);
        res.status(200).json({message: "Deleted successfully!"})
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred' });
    }
  })

  // delete student by admin
  router.delete("/tutor-reserve/students/:student_id", async (req, res)=>{
    try {
      const {student_id} = req.params;
        const result = await pool.query(`DELETE FROM students WHERE id=${student_id}`);
        res.status(200).json({message: "Deleted successfully!"})
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred' });
    }
  })

module.exports = router;