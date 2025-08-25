const express = require('express');
const app = express();
const db = require('./db');
require('dotenv').config();
const passport = require('./auth');

const bodyParser = require('body-parser'); //it is a middleware in express.js.
//  It is used to convert the request and parse that req in req.body
app.use(bodyParser.json()); //req.body
const PORT = process.env.PORT || 3000;

// middleWare Function
const logRequest = (req, res, next)=>{
    console.log(`[${new Date().toLocaleString()}] Request made to: ${req.originalUrl}`);
    next(); // move on to the next phase
};
app.use(logRequest);

app.use(passport.initialize());
const localAuthMiddleWare = passport.authenticate('local', {session: false});
app.get('/', (req,res)=>{
    res.send('Welcome to My Restaurant');
});

//Import the router Files
const personRoutes = require('./routes/personRoutes');
const menuRoutes = require('./routes/menuItemRoutes');

//use the routers
// app.use('/',personRoutes);
// app.use('/person', localAuthMiddleWare, personRoutes); // it is used for auth.js
app.use('/person', personRoutes);
app.use('/menu', menuRoutes);

app.listen(PORT, ()=>{
    console.log(`Server running on Port ${PORT}`);
});