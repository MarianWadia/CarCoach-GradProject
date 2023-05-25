const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const app = express();
const port = process.env.PORT || 8000;
app.use(cors());

app.use(bodyParser.json());

const signingInRouter = require('./routes/signin');
const signingUpRouter = require('./routes/signup');
const contactsRouter = require('./routes/contact-us');

app.use('/api',signingInRouter);
app.use('/api',signingUpRouter);
app.use('/api',contactsRouter);



app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});