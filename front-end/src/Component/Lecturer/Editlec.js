import axios from "axios";
import React, {useEffect, useState}  from "react";
import { Link, useParams } from "react-router-dom";

export default function Editslec() {
  const [inputval,setInputval] =useState ({
    firstName:"",
    lastName:"",
    email:"",
    password:"",
    contactNumber:"",
    moduleName:""
  });

  const [moduleOptions, setModuleOptions] = useState([]);

  useEffect( () => {
    const fetchModuleCodes = async () => {
      const moduleCodes = await fetch("http://localhost:5000/module");
      
      const data = await moduleCodes.json();
      setModuleOptions(
        data.map((module) => module.moduleName)
      );
    };
    fetchModuleCodes();
  }, []);

  const handleModuleNameCodeChange = (e) => {
    setInputval((prevVal) => ({
      ...prevVal,
      moduleName: e.target.value
    }));
  };

  const {id} = useParams();

  const fetchLecturer =async()=>{
    const res = await axios.get(`http://localhost:5000/lecturer/viewlec/${id}`);
    console.log(res);
    setInputval({
      firstName:res.data.firstName,
      lastName:res.data.lastName,
      email:res.data.email,
      password:res.data.password,
      contactNumber:res.data.contactNumber,
      moduleName:res.data.moduleName
    });
  };

  useEffect(()=>{
    fetchLecturer();
  }, []);

  const setData=(e)=>{
    setInputval({
      ...inputval,[e.target.name]:e.target.value
    });
  };
  
   const updateStudData =async(e)=>{
    e.preventDefault();  
    console.log(inputval);
    const res =await axios.put(`http://localhost:5000/lecturer/editlec/${id}`, inputval);

    console.log(res);
    if(res.status ===200){
      alert("Data Updated")
      window.location ="/lecturer";
    }
   };
    
  return (
    <>
      <div className="container mt-5">
        <form className="mx-auto w-50 shadow p-5">
        <Link className="btn btn-primary" to="/lecturer">Home</Link>
        <h3 className="mt-5">Edit Student Details</h3>
        <div class="mb-3">
        <label htmlFor="exampleInputEmail1" class="form-label">First Name</label>
        <input type="text" class="form-control" id="exampleInputEmail1"
          name="firstName" onChange={setData} value={inputval.firstName}
        aria-describedby="emailHelp"/>
      </div>
      <div class="mb-3">
        <label htmlFor="exampleInputEmail1" class="form-label">Last Name</label>
        <input type="text" class="form-control" id="exampleInputEmail1"
          name="lastName" onChange={setData} value={inputval.lastName}
        aria-describedby="emailHelp"/>
      </div>
      <div class="mb-3">
        <label htmlFor="exampleInputEmail1" class="form-label">Email</label>
        <input type="text" class="form-control" id="exampleInputEmail1"
          name="email" onChange={setData} value={inputval.email}
        aria-describedby="emailHelp"/>
      </div>
      <div class="mb-3">
        <label htmlFor="exampleInputEmail1" class="form-label">Password</label>
        <input type="text" class="form-control" id="exampleInputEmail1"
          name="password" onChange={setData} value={inputval.password}
        aria-describedby="emailHelp"/>
      </div>
      <div class="mb-3">
        <label htmlFor="exampleInputEmail1" class="form-label">Contact Number</label>
        <input type="text" class="form-control" id="exampleInputEmail1"
          name="contactNumber" onChange={setData} value={inputval.contactNumber}
        aria-describedby="emailHelp"/>
      </div>
      
      <div className="mb-3">
          <label htmlFor="moduleName" className="form-label">
            Module
          </label>
          <select
            className="form-select"
            id="moduleName"
            name="moduleName"
            onChange={handleModuleNameCodeChange}
            value={inputval.moduleName}
          >
            <option value="" disabled>Select Module</option>
            {moduleOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}

          </select>
        </div>
        <button className="btn btn-primary" onClick={updateStudData}>Update Lecuter</button>
        </form>
      </div>
    </>
  );
};
