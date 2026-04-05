const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port =  5000;

app.use(cors());
app.use(express.json());

app.get('/api/status', (req, res) => {
  res.json({ status: 'server on' });
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});


