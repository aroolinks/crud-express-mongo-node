const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');

const app = express();
dotenv.config({ path: `config.env` });

const PORT = process.env.PORT || 8080;

//log requests
app.use(morgan('tiny'));

app.get('/', (req, res) => {
  res.send('Crud Application');
});

app.listen(3000, () => {
  console.log(`server is running on http://localhost:${PORT}`);
});
