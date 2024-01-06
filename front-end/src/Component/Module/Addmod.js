import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";


export default function Addmod() {
  const [inputval,setInputval] = useState ({
    moduleCode:"",
    moduleName:"",
    degreeName:"",
    firstName:""
  });

  const [degreeOptions, setDegreeOptions] = useState([]);

  useEffect( () => {
    const fetchDegreeCodes = async () => {
      const degreeCodes = await fetch("http://localhost:5000/degree");
      
      const data = await degreeCodes.json();
      setDegreeOptions(
        data.map((degree) => degree.degreeName)
      );
    };
    fetchDegreeCodes();
  }, []);

  const handleDegreeCodeChange = (e) => {
    setInputval((prevVal) => ({
      ...prevVal,
      degreeName: e.target.value
    }));
  };

  const [lecturerOptions, setLecturerOptions] = useState([]);

  useEffect( () => {
    const fetchLecturerCodes = async () => {
      const lecturerCodes = await fetch("http://localhost:5000/lecturer");
      
      const data = await lecturerCodes.json();
      setLecturerOptions(
        data.map((lecturer) => lecturer.firstName)
      );
    };
    fetchLecturerCodes();
  }, []);

  const handleLecturerFirstNameCodeChange = (e) => {
    setInputval((prevVal) => ({
      ...prevVal,
      firstName: e.target.value
    }));
  };
  
  const setData=(e)=>{
    const {name,value}=e.target;
    setInputval((preval)=>{
      return{
        ...preval,[name] :value
      }
    })
  }

    
    const addModuleData =async(e)=>{
      e.preventDefault();

      
      const {moduleCode, moduleName, degreeName, firstName}= inputval;
      
      const res = await fetch("http://localhost:5000/module/addmod",{  
          method:"POST",
          headers:{
            "Content-Type" : "application/json"
          },
          body : JSON.stringify({
          moduleCode, moduleName, degreeName, firstName
          }),
      });

      const data =await res.json();
      console.log(data);

      if(res.status ===422 || !data){
        alert("Error");
      }
      else{
        setInputval(data);

        console.log(data);
        alert("Data Added")
        window.location ="/module";
        
        if(res.status ===200){
          alert("Data Added")
          window.location ="/module";
        }
      }

    }

  
  return (
    <>
      <div className="container mt-5">
        <form className="mx-auto w-50 shadow p-5">
        <Link className="btn btn-primary" to="/module">Home</Link>
        <h3 className="mt-5">Fill Module Details</h3>
        <div class="mb-3">
                <label htmlFor="exampleInputEmail1" class="form-label">Module Code</label>
                <input type="text" class="form-control" id="exampleInputEmail1"
                  name="moduleCode" onChange={setData} value={inputval.moduleCode}
                aria-describedby="emailHelp"/>
        </div>
        <div class="mb-3">
                <label htmlFor="exampleInputEmail1" class="form-label">Module Name</label>
                <input type="text" class="form-control" id="exampleInputEmail1"
                  name="moduleName" onChange={setData} value={inputval.moduleName}
                aria-describedby="emailHelp"/>
        </div>

        <div className="mb-3">
          <label htmlFor="degreeName" className="form-label">
            Degree
          </label>
          <select
            className="form-select"
            id="degreeName"
            name="degreeName"
            onChange={handleDegreeCodeChange}
            value={inputval.degreeName}
            >
              <option value="" disabled>Select Degree</option>
              {degreeOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}

          </select>
        </div>

        <div className="mb-3">
          <label htmlFor="firstName" className="form-label">
            Lecturer
          </label>
          <select
            className="form-select"
            id="firstName"
            name="firstName"
            onChange={handleLecturerFirstNameCodeChange}
            value={inputval.firstName}
            >
              <option value="" disabled>Select Lecturer</option>
              {lecturerOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}

          </select>
        </div>

        <button className="btn btn-primary" onClick={addModuleData} >Add Module</button>
        </form>
      </div>
    </>
  );
  
}
