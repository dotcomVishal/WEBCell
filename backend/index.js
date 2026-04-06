const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('mongodb connected'))
    .catch((error) => console.error('error : ', error));

app.use('/api/auth', require('./auth/route'));

app.use('/api/project', require('./routes/project')); 

app.use('/api/team', require('./routes/team'));

app.use('/api/activework', require('./routes/activework'));

app.get('/api/status', (req, res) => {
  res.json({ status: 'server on' });
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
