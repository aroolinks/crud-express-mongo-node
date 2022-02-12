const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const bodyparser = require('body-parser');
const path = require('path');

const app = express();
dotenv.config({ path: `config.env` });

const PORT = process.env.PORT || 8080;

//log requests
app.use(morgan('tiny'));

//parese qrequest to bodyparser
app.use(bodyparser.urlencoded({ extended: true }));

//set view engine
app.set('view engine', 'ejs');
//if you create another folder in view folder
//app.set('views', path.resolve(__dirname, 'views/ejs'));

//load assets
app.use('/css', express.static(path.resolve(__dirname, 'assest/css')));
app.use('/js', express.static(path.resolve(__dirname, 'assest/js')));
app.use('/img', express.static(path.resolve(__dirname, 'assest/img')));

app.get('/', (req, res) => {
  res.send('Crud Application');
});

app.listen(3000, () => {
  console.log(`server is running on http://localhost:${PORT}`);
});
