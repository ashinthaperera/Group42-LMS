const mongoose = require('mongoose');

//telling the structure of the table (collection) in mongodb by creating schema
const lecturerSchema = new mongoose.Schema({
 
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    contactNumber: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: false
    }
})

//telling the  mongoose to create a collection using following structure of the schema
const lecturers = new mongoose.model("lecturers",lecturerSchema);
//sending the relavent model to the index.js
module.exports=lecturers;