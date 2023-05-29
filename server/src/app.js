const express = require("express");
const bcrypt = require('bcrypt')
const app = express();
const cors = require('cors')
const jwt = require('jsonwebtoken');
const port = process.env.PORT || 5100;
const mongoose = require('mongoose');
const { MONGO_URI } = require('./db/connect');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const models = require("./models/schema");
const multer = require('multer');


app.use(cors());




app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });
  
  
  module.exports = app;