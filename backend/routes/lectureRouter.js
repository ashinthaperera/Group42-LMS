const express = require('express');

const lecturerRouter = express.Router();
const app = express();

//utilizing the student model 
const lecturers = require('../models/lecturerSchema');

//post API to create a student
lecturerRouter.post("/lecturer/addlec",async(req,res)=>{

    const {firstName,lastName,contactNumber,email,role} = req.body;
    
    if(!firstName || !lastName || !contactNumber || !email || !role ){
        res.status(404).json("please fill the Data");
    }

    try{
        //check whether the data already exist
        const prelec=await lecturers.findOne({contactNumber:contactNumber});
        if(prelec){
            res.status(404).json("This Lecture already present")
        }
        //if the data doesnt exist then sent to the db
        else{
        const addlecturer = new lecturers({firstName,lastName,contactNumber,email,role});
        const lecData = await addlecturer.save();
        console.log(addlecturer);
        res.status(201).json(lecData);
        }
    }catch(err){
        res.status(404).json(err);
    }
    
})

//other method
lecturerRouter.get("/lecturer/",async(req,res)=>{
    try{
        //retrieving the data from the db and storing it
        const lecData =await lecturers.find({});
        //sending the data to the frontend
        res.send(lecData);
    }catch (error){
        res.send(error);
    }
});

lecturerRouter.get("/lecturer/viewlec/:id", async (req,res)=>{
    try{
        const id =req.params.id;
        const lec = await lecturers.findById({ _id : id });
        res.send(lec)
    }catch(error){
        res.send(error);
    }
});

lecturerRouter.put("/lecturer/editlec/:id",async(req,res)=>{
    try{
        const id =req.params.id;
        const lec = await lecturers.findByIdAndUpdate({_id : id }, req.body,{
            new:true,
        });
        res.send(lec);
    }catch(error){
        res.send(error);
    }
})

lecturerRouter.delete("/lecturer/deletelec/:id",async(req,res)=>{
    try{
        const id = req.params.id;
        const lec = await lecturers.findByIdAndDelete({_id:id});
        res.send(lec);
    }catch(error){
        res.send(error);
    }
})


module.exports = lecturerRouter;