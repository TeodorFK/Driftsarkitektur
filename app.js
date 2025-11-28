const express = require('express');
const router = require('./routes/default_routes');

const app = express();

app.set('view engine', 'ejs');
app.use(express.json());

app.listen(3000);

app.use(router);
