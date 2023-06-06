const express = require('express');
const pool = require('../db');
const dotenv = require('dotenv');
const multer = require('multer');
const path = require('path');

dotenv.config();

const router = express.Router();
const carImages = path.resolve(__dirname, '..', 'upload', 'cars');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, carImages); // Set the folder where you want to store the images
    },
    filename: function (req, file, cb) {
        const fileExtension = path.extname(file.originalname);
        const generatedFileName = `${file.fieldname}_${Date.now()}${fileExtension}`; // Generate a unique file name
        cb(null, generatedFileName);
    }
  })
  const upload = multer({ storage: storage });


  router.post('/upload-car/:id', upload.single('car_image'), async (req, res) => {
    try {
        const user_id = req.params.id;
        const {
            first_name,
            last_name,
            phone,
            gender,
            working_location,
            age,
            address,
            is_own_car,
            experience_years,
            interview_time,
            interview_date,
            details
        } = req.body;
        const driver_license = req.files['driver_license'][0];
        const driver_image = req.files['driver_image'][0];
        const result = await pool.query(
            'INSERT INTO tutors_applicants (user_id, first_name, last_name, phone, age, gender, address, is_own_car, experience_years, driver_license, driver_image, working_location, interview_time, interview_date, details) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15) RETURNING *', 
            [user_id, first_name, last_name, phone, age, 
              gender, address, is_own_car, experience_years, 
              driver_license.path, driver_image.path, 
              working_location, interview_time, 
              interview_date, 
              details
            ]);
        const id = result.rows[0];
        res.status(201).json({ id });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'An error occurred' });
    }
})