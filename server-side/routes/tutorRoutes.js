const express = require('express');
const pool = require('../db');
const dotenv = require('dotenv');
const multer = require('multer');
const path = require('path');

dotenv.config();

const router = express.Router();
const tutorImagesDir = path.resolve(__dirname, '..', 'upload', 'tutors');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
      cb(null, tutorImagesDir); // Set the folder where you want to store the images
  },
  filename: function (req, file, cb) {
      const fileExtension = path.extname(file.originalname);
      const generatedFileName = `${file.fieldname}_${Date.now()}${fileExtension}`; // Generate a unique file name
      cb(null, generatedFileName);
  }
})
const upload = multer({ storage: storage });


router.post('/tutors-applicants/:id', upload.fields([
    { name: 'driver_license', maxCount: 1 },
    { name: 'driver_image', maxCount: 1 }
  ]), async (req, res) => {
    try {
        const user_id = req.params.id;
        const {
            first_name,
            last_name,
            phone,
            email,
            gender,
            working_location,
            age,
            address,
            is_own_car,
            experience_years,
            interview_time,
            interview_date,
            bio
        } = req.body;
        const driver_license = req.files['driver_license'][0].path;
        const driver_image_file = req.files['driver_image'][0].path;
        const fileName = path.basename(driver_image_file);
        const driver_image = `http://localhost:8080/api/tutor-image/${fileName}`
        let tutorId;
        if(is_own_car === "true"){
            const result = await pool.query(
                `INSERT INTO tutors_applicants (user_id, first_name, last_name, phone, email, age, gender, address, experience_years, driver_license, driver_image, working_location, interview_time, interview_date, bio, is_own_car) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, true) RETURNING *`, 
                [user_id, first_name, last_name, phone, email, age, 
                  gender, address, experience_years, 
                  driver_license, driver_image, 
                  working_location, interview_time, 
                  interview_date, 
                  bio,
                ]);
             tutorId = result.rows[0].id;
            res.status(201).send({
                tutorId: tutorId, 
                redirectionLink:`http://localhost:3000/join-us/${user_id}/upload-car/${tutorId}`,
                message: "Successfully uploaded"
            })
            console.log(tutorId);
        }else if(is_own_car === "false"){
            const result = await pool.query(
                `INSERT INTO tutors_applicants (user_id, first_name, last_name, phone, email, age, gender, address, experience_years, driver_license, driver_image, working_location, interview_time, interview_date, bio, is_own_car) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, false) RETURNING *`, 
                [user_id, first_name, last_name, phone, email, age, 
                  gender, address, experience_years, 
                  driver_license, driver_image, 
                  working_location, interview_time, 
                  interview_date, 
                  bio
                ]);
             tutorId = result.rows[0].id;
             res.status(201).json({tutorId: tutorId, message: "Successfully uploaded! We Will contact You Soon!"});
        }
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'An error occurred' });
    }
})

router.post('/tutors-applicants/car/:tutorId', upload.single('car_image'), async(req, res)=>{
    try {
        const {tutorId} = req.params
        const{ motor_type, color, model, year, license_plate, hour_price, hour_speed, details} = req.body;
        const car_image_file = req.file.path;
        const fileName = path.basename(car_image_file);
        const car_image = `http://localhost:8080/api/tutor-image/${fileName}`
        // ***they are made just needed to be tested
        const carInsert = await pool.query(`INSERT INTO car_uploads (tutor_id, motor_type, color, model, year, license_plate, car_image, hour_price, hour_speed, details, usage) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, 'coaching') RETURNING id`, [
            tutorId,
            motor_type, 
            color,
            model,
            year,
            license_plate,
            car_image,
            hour_price,
            hour_speed,
            details
        ]);
        res.status(201).json({message: "Uploaded successfully, We Will contact You Soon!"})
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred' });
    }
})


router.get("/tutors-applicants", async (req, res)=>{
    try {
        const result = await pool.query('SELECT * FROM tutors_applicants WHERE is_accepted=true');
        const response = result.rowCount;
        if(response){
            data = response.rows;
            res.status(200).json({data: data})
        }
    } catch (error) {
        console.error(err);
        res.status(500).json({ message: 'An error occurred' });
    }
})


router.get("/tutors-applicants/:id", async (req, res)=>{
    try {
        const { id } = req.params;
        const result = await pool.query('SELECT is_accepted, first_name, last_name, phone, age, gender, experience_years, driver_image, working_location, bio FROM tutors_applicants WHERE id = ($1)', [
            id
        ]);
        const is_accepted = result.rows[0].is_accepted
        if(is_accepted===true){
            const {first_name, last_name, phone, age, gender, experience_years, driver_image, working_location, bio, email} = result.rows[0];
            const response = {
                name: `${first_name}${last_name}`,
                phone,
                email,
                age,
                gender,
                experience_years,
                working_location,
                bio,
                driver_image
            }
            res.status(200).json(response);
        }
        else {
            res.json("sorry you didn't get accepted");
        }
    } catch (error) {
        console.error(err);
        res.status(500).json({ message: 'An error occurred' });
    }
})

module.exports = router;