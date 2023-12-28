import axios from "axios";
import React, {useEffect, useState}  from "react";
import { Link, useParams } from "react-router-dom";
// import students from "../../../backend/models/studSchema";

export default function Editmod() {
  const [inputval,setInputval] =useState ({
    moduleCode:"",
    moduleName:"",
    
  });

  //assigning the parameter as a variable 
  const {id} = useParams()
  // data single fetching 
  const fetchModule =async()=>{
    const res = await axios.get(`http://localhost:5000/module/viewmod/${id}`);
    console.log(res);
    setInputval({
      moduleCode:res.data.moduleCode,
      moduleName:res.data.moduleName,
      
    }) //magic
  }

  useEffect(()=>{
    fetchModule();
  }, []);

  /*hooks*/
  const setData=(e)=>{
    // console.log(e.target.value)
    // const {name,value}=e.target;
    // setInputval((preval)=>{
    //   return{
    //     ...preval,[name] :value
    //   }
    // })
    setInputval({
      ...inputval,[e.target.name]:e.target.value
    });
  }
  
   //after the api works (through postman checking)
   const updateModData =async(e)=>{
    e.preventDefault();  
    console.log(inputval);
    const res =await axios.put(`http://localhost:5000/module/editmod/${id}`, inputval);

    console.log(res);
    if(res.status ===200){
      alert("Data Updated")
      window.location ="/module/";
    }
   };
    
  return (
    <>
      <div className="container mt-5">
        <form className="mx-auto w-50 shadow p-5">
        <Link className="btn btn-primary" to="/module/">Home</Link>
        <h3 className="mt-5">Edit Module Details</h3>
        <div class="mb-3">
                <label htmlFor="exampleInputEmail1" class="form-label">Module Code</label>
                <input type="text" class="form-control" id="exampleInputEmail1"
                  name="moduleCode" onChange={setData} value={inputval.moduleCode} //magic
                aria-describedby="emailHelp"/>
        </div>
        <div class="mb-3">
                <label htmlFor="exampleInputEmail1" class="form-label">Module Name</label>
                <input type="text" class="form-control" id="exampleInputEmail1"
                  name="moduleName" onChange={setData} value={inputval.moduleName}
                aria-describedby="emailHelp"/>
        </div>
        <button className="btn btn-primary" onClick={updateModData}>Update Module</button>
        </form>
      </div>
    </>
  );
}
