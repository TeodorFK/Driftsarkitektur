const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const dbhandler = require('./handler/dbhandler');
const default_routes = require('./routes/default_routes');
const user_routes = require('./routes/user_routes');

const app = express();

//middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

//view engine
app.set('view engine', 'ejs');

//DB connection
app.listen(3000, async () => {
  await dbhandler.connectToDatabase(
    'mongodb://10.12.5.69:27017/',
    'puppies',
    'users'
  );
  console.log('Connected to database');
});

//Routes
app.use(default_routes);
app.use(user_routes);
