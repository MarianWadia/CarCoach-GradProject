const express = require('express');
const pool = require('../db');
const dotenv = require('dotenv');
const multer = require('multer');
const path = require('path');

dotenv.config();

const router = express.Router();

const carsImagesDir = path.resolve(__dirname, '..', 'upload', 'cars');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, carsImagesDir); // Set the folder where you want to store the images
    },
    filename: function (req, file, cb) {
        const fileExtension = path.extname(file.originalname);
        const generatedFileName = `${file.fieldname}_${Date.now()}${fileExtension}`; // Generate a unique file name
        cb(null, generatedFileName);
    }
  })
  const upload = multer({ storage: storage });

  router.post('/car-uploads/:id?', upload.single('car_image'), async (req, res) => {
    try {
        const user_id = req.params.id || null;
        if(user_id==null){
            res.json({unauthorizedMessage: "You should Login First. If You Don't have an account Signup Now!"});
        }else{
            const{ motor_type, color, model, year, license_plate, hour_price, hour_speed, details, available_from, usage, from_address, to_address} = req.body;
            const car_image_file = req.file.path;
            const fileName = path.basename(car_image_file);
            const car_image = `http://localhost:8080/api/car-image/${fileName}`
            const carInsert = await pool.query(`INSERT INTO car_uploads (owner_id, motor_type, color, model, year, license_plate, car_image, hour_price, hour_speed, details, available_from, usage, from_address, to_address) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14) RETURNING id`, [
                user_id,
                motor_type, 
                color,
                model,
                year,
                license_plate,
                car_image,
                hour_price,
                hour_speed,
                details,
                available_from,
                usage,
                to_address
            ]);
            res.status(201).json("Car Data Uploaded successfully!")
        }
    }catch (err) {
        console.error(err);
        res.status(500).json({ message: 'An error occurred' });
      }
  })


  router.get("/car-uploads", async (req, res)=>{
    try {
        const result = await pool.query(`SELECT * FROM car_uploads WHERE available=true AND usage='renting'`);
        const response = result.rows;
        res.status(200).json(response)
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred' });
    }
})

  router.get("/car-uploads/:id", async (req, res)=>{
    try{
        const car_id = req.params.id;
        const result = await pool.query('SELECT * FROM car_uploads WHERE id = ($1)', [car_id]);
        const response = result.rows[0];
        res.status(200).json(response);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred' });
    }
})

router.get("/car-uploads-admins", async (req, res)=>{
    try {
        const result = await pool.query('SELECT * FROM car_uploads');
        const response = result.rowCount;
        if(response){
            const data = result.rows;
            res.status(200).json({data: data})
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred' });
    }
})

  // delete renting reservation by admin
  router.delete("/car-uploads-admins/:car_id", async (req, res)=>{
    try {
      const {car_id} = req.params;
        const result = await pool.query(`DELETE FROM car_uploads WHERE id=${car_id}`);
        res.status(200).json({message: "Deleted successfully!"})
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred' });
    }
  })

  module.exports = router;

