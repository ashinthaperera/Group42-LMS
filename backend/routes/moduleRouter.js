const express = require('express');
const moduleRouter = express.Router();
const app = express();

//utilizing the student model
const Modules = require("../models/modSchema"); 
// const Lecturers = require("../models/lecturerSchema");


//post API to create a student
// moduleRouter.post("module/addmod",async(req,res)=>{
//     console.log(req.body);

//     //add structure json data structure order
//     const {moduleCode,moduleName} = req.body;

//     //validation
//     if(!moduleCode || !moduleName ){
//         res.status(404).json("please fill the Data");
//     }
    
//     try{
//         //check whether the data already exist
//         const prestud=await Modules.findOne({moduleCode:moduleCode});
//         if(prestud){
//             res.status(404).json("This model code already present")
//         }
//         //if the data doesnt exist then sent to the db
//         else{ //magic
//             const addmodule = new Modules({moduleCode,moduleName});
//             const ModData = await addmodule.save();
//             console.log(req.body);//
//             res.status(201).json(ModData);
//         }
//     }catch(err){
//         res.status(404).json(err) //400 for validation errors, and 500 for internal server errors
//     }
// })
moduleRouter.post("/module/addmod",async(req,res)=>{
    //console.log(req.body);

    //add structure json data structure order
    const {moduleCode,moduleName} = req.body;

    // validation
    if(!moduleCode || !moduleName ){
        res.status(404).json("please fill the Data");
    }

    try {
      //check whether the data already exist
      const prestud = await Modules.findOne({ moduleCode: moduleCode });
      if (prestud) {
        res.status(404).json("This model code already present");
      }
      //if the data doesnt exist then sent to the db
      else {
        //magic
        const addmodule = new Modules({ moduleCode, moduleName });
        const ModData = await addmodule.save();
        console.log(ModData); //
        res.status(201).json(ModData);
      }
    } catch (err) {
      res.status(404).json(err); //400 for validation errors, and 500 for internal server errors
    }
})


//other method
moduleRouter.get("/module/",async(req,res)=>{
    try{
        // students.find({})
        // .then(studs => res.json(studs))
        // .catch(err => res.json(err))

        //retrieving the data from the db and storing it
        const ModData =await Modules.find({});
        //sending the data to the frontend
        res.send(ModData);
    }catch (error){
        res.send(error);
    }
});
 //viewmod/:id
moduleRouter.get("/module/viewmod/:id", async (req,res)=>{
    try{
        const id =req.params.id;
        const mod = await Modules.findById({ _id : id });
        res.send(mod)
    }catch(error){
        res.send(error);
    }
});

moduleRouter.put("/module/editmod/:id",async(req,res)=>{
    try{
        const id =req.params.id;
        const mod = await Modules.findByIdAndUpdate({_id : id }, req.body,{
            new:true,
        });
        res.send(mod);
    }catch(error){
        res.send(error);
    }
})

moduleRouter.delete("/module/deletemod/:id",async(req,res)=>{
    try{
        const id = req.params.id;
        const mod = await Modules.findByIdAndDelete({_id:id});
        res.send(mod);
    }catch(error){
        res.send(error);
    }
})

module.exports = moduleRouter;
