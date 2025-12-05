const express = require('express');
const mongoose = require('express');
const dbhandler = require('./handler/dbhandler');
const router = require('./routes/default_routes');

const app = express();

app.set('view engine', 'ejs');
app.use(express.json());

app.listen(3000, async () => {
  await dbhandler.connectToDatabase('mongodb://10.12.5.69:27017/', 'puppies');
  console.log('Connected to database');
});

app.use(router);
