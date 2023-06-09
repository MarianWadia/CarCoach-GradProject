const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const app = express();
const port = process.env.PORT || 8000;
app.use(cors());

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Credentials', 'true');
  next();
})


const userRoutes = require('./routes/userRoutes');
const passwordRoutes = require('./routes/passwordRoutes');
const contactsRouter = require('./routes/contact-us');
const tutorRoutes = require('./routes/tutorRoutes');
const carRoutes = require('./routes/carRoutes');




app.use('/api/users',userRoutes);
app.use('/api/password', passwordRoutes);
app.use('/api',contactsRouter);
app.use('/api', tutorRoutes);
app.use('/api', carRoutes)
app.use('/api/tutor-image', express.static('upload/tutors'))
app.use('/api/car-image', express.static('upload/cars'))



app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});