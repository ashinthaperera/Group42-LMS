const mongoose = require('mongoose');

//telling the structure of the table (collection) in mongodb by creating schema
const modSchema = new mongoose.Schema({
 
    moduleCode :{
        type:String,
        required:true
    },
    moduleName :{
        type:String,
        required:true
    },
    // lecturerId: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "Lecturer",
    //     required: true,
    // },
    // degreeId: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "Degree",
    //     required: true,
    // }
   
})

//telling the  mongoose to create a collection using following structure of the schema
const Modules = new mongoose.model("Modules",modSchema);
//sending the relavent model to the index.js
module.exports=Modules;