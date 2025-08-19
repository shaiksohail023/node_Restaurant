const express = require('express');
const app = express();
const db = require('./db');
require('dotenv').config();

const bodyParser = require('body-parser'); //it is a middleware in express.js.
//  It is used to convert the request and parse that req in req.body
app.use(bodyParser.json()); //req.body
const PORT = process.env.PORT || 3000;

app.get('/', (req,res)=>{
    res.send('Welcome to My Restaurant');
});

//Import the router Files
const personRoutes = require('./routes/personRoutes');
const menuRoutes = require('./routes/menuItemRoutes');

//use the routers
// app.use('/',personRoutes);
app.use('/person',personRoutes);
app.use('/menu',menuRoutes);

app.listen(PORT, ()=>{
    console.log(`Server running on Port ${PORT}`);
})