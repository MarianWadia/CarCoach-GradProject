const express = require('express');
const pool = require('../db');
const dotenv = require('dotenv');
const multer = require('multer');
const path = require('path');
const nodemailer = require('nodemailer');

dotenv.config();


function sendEmail({ email, name}) {
  return new Promise((resolve, reject) => {
    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.FROM_EMAIL,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.FROM_EMAIL,
      to: email,
      subject: 'Acceptance Email',
      text: `Dear ${name}, Congratulations you have been accepted as a driving tutor in our platform`,
    };
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
        return reject({ message: `An error has occurred` });
      }
      return resolve({ message: "Email sent successfully" });
    });
  });
}

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


router.post('/tutors-applicants/:id?', upload.fields([
    { name: 'driver_license', maxCount: 1 },
    { name: 'driver_image', maxCount: 1 }
  ]), async (req, res) => {
    try {
        const user_id = req.params.id || null;
        if(user_id==null){
            res.json({unauthorizedMessage: "You should Login First. If You Don't have an account Signup Now!"});
        }else{
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
        }
    } catch (error) {
      console.error(error);
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


router.get("/tutors-applicants-all/:searchBy?", async (req, res)=>{
    try {
      const {searchBy} = req.params || { searchBy: null };
      let response;
      if (searchBy && searchBy === 'female') {
        const result = await pool.query(`SELECT * FROM tutors_applicants WHERE is_accepted=true AND gender = 'female'`);
        response = result.rows;
      } else if (searchBy && searchBy === 'male') {
        const result = await pool.query(`SELECT * FROM tutors_applicants WHERE is_accepted=true AND gender = 'male'`);
        response = result.rows;
      } else {
        const result = await pool.query('SELECT * FROM tutors_applicants WHERE is_accepted=true');
        response = result.rows;
      }
      if(response){
        res.status(200).json(response);
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'An error occurred' });
    }
  })


router.get("/tutors-applicants/:id", async (req, res)=>{
    try {
        const { id } = req.params;
        const result = await pool.query('SELECT is_accepted, first_name, last_name, phone, age, gender, experience_years, driver_image, working_location, bio, email FROM tutors_applicants WHERE id = ($1)', [
            id
        ]);
        const is_accepted = result.rows[0].is_accepted
        if(is_accepted===true){
            const {first_name, last_name, phone, age, gender, experience_years, driver_image, working_location, bio, email, rating} = result.rows[0];
            const response = {
                name: `${first_name} ${last_name}`,
                phone,
                email,
                age,
                gender,
                experience_years,
                working_location,
                bio,
                driver_image, 
                rating
            }
            res.status(200).json(response);
        }
        else {
            res.json("sorry you didn't get accepted");
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred' });
    }
})

 //update tutor acceptance in tutors_applicants table and is_tutor in users table -- by admin
  router.put("/tutors-applicants-admins/:tutor_id", async (req, res)=>{
    try {
        const {tutor_id} = req.params;
        const update1 = await pool.query(`UPDATE tutors_applicants SET is_accepted = true WHERE id=${tutor_id}`);
        const resultUserId = await pool.query(`SELECT user_id FROM tutors_applicants WHERE id=${tutor_id}`);
        const {user_id} = resultUserId.rows[0];
        const update2 = await pool.query(`UPDATE users SET is_tutor = true WHERE id=${user_id}`);
        const tutorData = await pool.query(`SELECT first_name, email From tutors_applicants WHERE id = ${tutor_id}`);
        const {first_name, email} = tutorData.rows[0];
        sendEmail({name: first_name, email}); 
        res.status(200).json({message: "Updated Successfully and email sent!"})
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred' });
    }
  })

module.exports = router;