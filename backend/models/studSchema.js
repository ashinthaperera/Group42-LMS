const mongoose = require('mongoose');

//telling the structure of the table (collection) in mongodb by creating schema
const studSchema = new mongoose.Schema({
 
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    dob: {
        type: Date,
        required: true
    },
    contactNumber: {
        type: String,
        required: false
    },
    // degreeId: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "Degree",
    //     required: true,
    // }
})

//telling the  mongoose to create a collection using following structure of the schema
const students = new mongoose.model("students",studSchema);
//sending the relavent model to the index.js
module.exports=students;