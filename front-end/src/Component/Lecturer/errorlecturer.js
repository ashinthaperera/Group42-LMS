import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

export default function Editlec (){
    const [inputval,setInputval] =useState ({
      firstName:"",
      lastName:"",
      contactNumber:"",
      email:"",
      role:"",
      });
    
      // //assigning the parameter as a variable 
      // const {id} = useParams()
      // // data single fetching 
      // const fetchLecturer =async()=>{
      //   const res = await axios.get(`http://localhost:5000/lecturer/viewlec/${id}`);
      //   console.log(res);
      //   setInputval({
      //     firstName:res.data.firstName,
      //     lastName:res.data.lastName,
      //     contactNumber:res.data.contactNumber,
      //     email:res.data.email,
      //     role:res.data.role,
      //   }) //magic
      // }
    
      const {id} = useParams()
      // data single fetching 
      const fetchLecturer =async()=>{
        const res = await axios.get(`http://localhost:5000/lecturer/viewlec/${id}`);
        console.log(res);
        setInputval({
          firstName:res.data.firstName,
          address:res.data.address,
          subject:res.data.subject,
          mobile:res.data.mobile,
        }) //magic
      }

      useEffect(()=>{
        fetchLecturer();
      }, []);
    
      /*hooks*/
      const setData=(e)=>{

        setInputval({
          ...inputval,[e.target.name]:e.target.value
        });
      }
      
       //after the api works (through postman checking)
       const updateLecData =async(e)=>{
        e.preventDefault();  
        console.log(inputval);
        //data update
        const res =await axios.put(`http://localhost:5000/lecturer/editlec/${id}`, inputval);
    
        console.log(res);
        if(res.status ===200){
          alert("Data Updated")
          window.location ="/";
        }
       };

    return(

        <>
        <div className="container mt-5">
          <form className="mx-auto w-50 shadow p-5">
          <Link className="btn btn-primary" to="/lecturer">Home</Link>
          <h3 className="mt-5">Edit Student Details</h3>
          <div class="mb-3">
                  <label for="exampleInputEmail1" class="form-label">Lecture FName</label>
                  <input type="text" class="form-control" id="exampleInputEmail1"
                   name="name" onChange={setData} value={inputval.firstName}
                  aria-describedby="emailHelp"/>
          </div>
          <div class="mb-3">
                  <label for="exampleInputEmail1" class="form-label">Lecture LName</label>
                  <input type="text" class="form-control" id="exampleInputEmail1"
                   name="name" onChange={setData} value={inputval.lastName}
                  aria-describedby="emailHelp"/>
          </div>
          <div class="mb-3">
                  <label for="exampleInputEmail1" class="form-label">Lecture mobile</label>
                  <input type="text" class="form-control" id="exampleInputEmail1"
                 name="address" onChange={setData} value={inputval.contactNumber}     
                 aria-describedby="emailHelp"/>
          </div>
          <div class="mb-3">
                  <label for="exampleInputEmail1" class="form-label">Lecture Email</label>
                  <input type="text" class="form-control" id="exampleInputEmail1"
                  name="subject" onChange={setData} value={inputval.email}
                  aria-describedby="emailHelp"/>
          </div>
          <div class="mb-3">
                  <label for="exampleInputEmail1" class="form-label">Lecture Role</label>
                  <input type="text" class="form-control" id="exampleInputEmail1"
                  name="mobile" onChange={setData} value={inputval.role}
                  aria-describedby="emailHelp"/>
          </div>
          
          <button className="btn btn-primary" onClick={updateLecData}>Update Student</button>
          </form>
        </div>
      </>

    )

}