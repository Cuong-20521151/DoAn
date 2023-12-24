require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();
app.use(express.json());
const routes = require('./Routers/Routers');
app.use('/api', routes)

var bodyParser = require('body-parser')
const mongoString ='mongodb://0.0.0.0:27017/QLTD'; 
mongoose.connect(mongoString);
const database = mongoose.connection;
app.listen(3000, () => {
  console.log(`Server Started at ${3000}`)
})