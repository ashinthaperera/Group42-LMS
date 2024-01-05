const express = require('express');

const studentRouter = express.Router();
const app = express();

//utilizing the student model
const students = require("../models/studSchema"); 


//post API to create a student
studentRouter.post("/student/addstud",async(req,res)=>{
    console.log(req.body);

    //add structure json data structure order
    const {firstName,lastName,email,address,dob,contactNumber} = req.body;

    //validation
    if(!firstName || !lastName || !address || !email || !dob ||!contactNumber){
        res.status(404).json("please fill the Data");
    }
    
    try{
        //check whether the data already exist
        const prestud=await students.findOne({contactNumber:contactNumber});
        if(prestud){
            res.status(404).json("This student already present")
        }
        //if the data doesnt exist then sent to the db
        else{
            const addstudent = new students({firstName,lastName,email,address,dob,contactNumber});
            const studData = await addstudent.save();
            // console.log(studData+" Hi ashi ");
            // res.send(studData); //error
            res.status(201).json(studData);
        }
    }catch(err){
        res.status(404).json(err) //400 for validation errors, and 500 for internal server errors
    }
})

//other method
studentRouter.get("/student/",async(req,res)=>{
    try{
        // students.find({})
        // .then(studs => res.json(studs))
        // .catch(err => res.json(err))

        //retrieving the data from the db and storing it
        const studData =await students.find({});
        //sending the data to the frontend
        res.send(studData);
    }catch (error){
        res.send(error);
    }
});

studentRouter.get("/student/viewstud/:id", async (req,res)=>{
    try{
        const id =req.params.id;
        const stud = await students.findById({ _id : id });
        res.send(stud)
    }catch(error){
        res.send(error);
    }
});

studentRouter.put("/student/editstud/:id",async(req,res)=>{
    try{
        const id =req.params.id;
        const stud = await students.findByIdAndUpdate({_id : id }, req.body,{
            new:true,
        });
        res.send(stud);
    }catch(error){
        res.send(error);
    }
})

studentRouter.delete("/student/deletestud/:id",async(req,res)=>{
    try{
        const id = req.params.id;
        const stud = await students.findByIdAndDelete({_id:id});
        res.send(stud);
    }catch(error){
        res.send(error);
    }
})

// app.get("/",(req,res)=>{
//     students.find({})
//     .then(studs => res.json(studs))
//     .catch(err => res.json(err))
// })

//add stud
// app.post("/addstud",(req,res)=>{
//     students.create(req.body)
//     .then(studs => res.json(studs))
//     .catch(err => res.json(err))
// })


module.exports = studentRouter;