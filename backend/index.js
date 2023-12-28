const express = require('express');
const mongoose = require('mongoose');
const dotenv = require("dotenv");

const app = express();
//const cors = require('cors');

//security
var cors = require('cors');
app.use(cors());

//add schema | add student model
const students = require("./models/studSchema");

//add router
// const studRouter = require("./routes/studRouter");
const studentRouter = require("./routes/studentRouter");
const moduleRouter = require("./routes/moduleRouter");

const lectureRouter = require('./routes/lectureRouter');


dotenv.config();
app.use(express.json());

// //use router
app.use(studentRouter);
app.use(lectureRouter);
app.use(moduleRouter);

//checking the connection of db
mongoose.connect(process.env.Database).then(()=>{
    console.log("Database connection Done")
    //catch an error if the db conn fails
}).catch((err)=>{
    console.log(err)
});


//define the backend port for sending data
app.listen(5000,()=>{
    console.log("Server is Running")
});