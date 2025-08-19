const mongoose = require('mongoose');
require('dotenv').config();

// Define the Mongodb Connection URL :
// mongodb:// <hostname>:<port>/<databaseName>
// const mongodbURL = process.env.MONGODB_URL_LOCAL; //local db
const mongodbURL = process.env.MONGODB_URL;

// Setup mongoDb Connection
mongoose.connect(mongodbURL);

//you can use these as well for these you dont need connected and error event listeners
// mongoose.connect(mongodbURL)
//   .then(() => console.log('Connected to MongoDB Server'))
//   .catch(err => console.log('MongoDB connection error:', err));

//get the default Connection
// Mongoose maintains a default connection object representing the mongodb connection
const db = mongoose.connection;

//Define event listeners for db Connection
db.on('connected', ()=>{
    console.log('Connected to MongoDB Server');
});

db.on('error', (err)=>{
    console.log('MongoDB connection error:', err);
});

db.on('disconnected', ()=>{
    console.log('MongoDB disconnected');
});

//Export the Database Connection and use these in another files or folders
module.exports = db;