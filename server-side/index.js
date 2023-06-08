const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const app = express();
const port = process.env.PORT || 8000;
app.use(cors());

app.use(bodyParser.json());


const userRoutes = require('./routes/userRoutes');
const passwordRoutes = require('./routes/passwordRoutes');
const contactsRouter = require('./routes/contact-us');
const tutorRoutes = require('./routes/tutorRoutes');



app.use('/api/users',userRoutes);
app.use('/api/password', passwordRoutes);
app.use('/api',contactsRouter);
app.use('/api', tutorRoutes);
app.use('/api/tutor-image', express.static('upload/tutors'))
app.use('/api/car-image', express.static('upload/cars'))
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  next();
})


app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});