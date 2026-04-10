const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit'); //to stop people from spamming  
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 100, 
  message: { error: 'Too many requests from this IP, please try again after 15 minutes' },
  standardHeaders: true, 
  legacyHeaders: false, 
});

app.use(helmet());
app.use(cors());
app.use(express.json());

app.use(globalLimiter);

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('mongodb connected'))
    .catch((error) => console.error('error : ', error));

app.use('/api/auth', require('./auth/route'));

app.use('/api/project', require('./routes/project')); 

app.use('/api/gallery', require('./routes/gallery'));

app.use('/api/team', require('./routes/team'));



app.get('/api/status', (req, res) => {
  res.json({ status: 'server on' });
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
