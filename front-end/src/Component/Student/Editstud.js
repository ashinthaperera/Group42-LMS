import axios from "axios";
import React, {useEffect, useState}  from "react";
import { Link, useParams } from "react-router-dom";
// import students from "../../../backend/models/studSchema";

export default function Editstud() {
  const [inputval,setInputval] =useState ({
    firstName:"",
    lastName:"",
    address:"",
    dob:"",
    contactNumber:"",
  });

  const {id} = useParams()
  // data single fetching 
  const fetchStudent =async()=>{
    const res = await axios.get(`http://localhost:5000/student/viewstud/${id}`);
    console.log(res);
    setInputval({
      firstName:res.data.firstName,
      lastName:res.data.lastName,
      address:res.data.address,
      dob:res.data.dob,
      contactNumber:res.data.contactNumber,
    }) //magic
  }

  useEffect(()=>{
    fetchStudent();
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
   const updateStudData =async(e)=>{
    e.preventDefault();  
    console.log(inputval);
    //data update
    const res =await axios.put(`http://localhost:5000/student/editstud/${id}`, inputval);

    console.log(res);
    if(res.status ===200){
      alert("Data Updated")
      window.location ="/student";
    }
   };
    
  return (
    <>
      <div className="container mt-5">
        <form className="mx-auto w-50 shadow p-5">
        <Link className="btn btn-primary" to="/student">Home</Link>
        <h3 className="mt-5">Edit Student Details</h3>
        <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label">Student firstName</label>
                <input type="text" class="form-control" id="exampleInputEmail1"
                 name="firstName" onChange={setData} value={inputval.firstName}
                aria-describedby="emailHelp"/>
        </div>
        <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label">Student lastName</label>
                <input type="text" class="form-control" id="exampleInputEmail1"
                 name="lastName" onChange={setData} value={inputval.lastName}
                aria-describedby="emailHelp"/>
        </div>
        <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label">Student Address</label>
                <input type="text" class="form-control" id="exampleInputEmail1"
               name="address" onChange={setData} value={inputval.address}     
               aria-describedby="emailHelp"/>
        </div>
        <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label">Student dob</label>
                <input type="date" class="form-control" id="exampleInputEmail1"
                name="dob" onChange={setData} value={inputval.dob}
                aria-describedby="emailHelp"/>
        </div>
        <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label">Student Mobile</label>
                <input type="text" class="form-control" id="exampleInputEmail1"
                name="contactNumber" onChange={setData} value={inputval.contactNumber}
                aria-describedby="emailHelp"/>
        </div>
        <button className="btn btn-primary" onClick={updateStudData}>Update Student</button>
        </form>
      </div>
    </>
  );
}
