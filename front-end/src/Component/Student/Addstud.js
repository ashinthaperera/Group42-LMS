import React, { useState } from "react";
import { Link } from "react-router-dom";
//import axios from 'axios'; //other method
//import { useNavigate } from "react-router-dom";

export default function Addstud() {
  /*other method*/
  //   const [name, setName] = useState()
  //   const [address, setAddress] = useState()
  //   const [subject, setSubject] = useState()
  //   const [mobile, setMobile] = useState()
  //   const navigate = useNavigate()

  //   const Submit =(e) =>{
  //     e.preventDefault();
  //     axios.post("http://localhost:5000/addstud",{name,address,subject,mobile})
  //     .then(result => {
  //       console.log(result)
  //       navigate('/')
  //     })
  //     .catch(err => console.log(err))
  //   }
  /*end*/

  const [inputval,setInputval] = useState ({ //in the start the details will empty
    firstName:"",
    lastName:"",
    address:"",
    dob:"",
    contactNumber:"",
  })

  /*hooks*/
  const setData=(e)=>{
    // console.log(e.target.value)
    const {name,value}=e.target;
    setInputval((preval)=>{
      return{
        ...preval,[name] :value
      }
    })
  }

    //after the api works (through postman checking)
    const addStudData =async(e)=>{
      e.preventDefault();

      //magic
      const {firstName,lastName,address,dob,contactNumber}=inputval;
      //insert route url of the addstud of the backend (see the backend port is similar to link's port)
      const res = await fetch("http://localhost:5000/student/addstud",{  
          method:"POST",
          headers:{
            "Content-Type" : "application/json"
          },
          body : JSON.stringify({
            firstName,lastName,address,dob,contactNumber
          })
      });

      const data =await res.json();
      console.log(data);

      //validation
      if(res.status ===422 || !data){
        alert("Error");
      }
      else{
        setInputval(data);

        console.log(data);
        alert("Data Added")
        window.location ="/student";
        //this if isnt working
        if(res.status ===200){
          alert("Data Added")
          window.location ="/student";
        }
      }

    }
  
  return (
    <>
      <div className="container mt-5">
        <form className="mx-auto w-50 shadow p-5" //onSubmit={Submit} //form submission
        >
        <Link className="btn btn-primary" to="/student">Home</Link>
        <h3 className="mt-5">Fill Student Details</h3>
        <div class="mb-3">
                <label htmlFor="exampleInputEmail1" class="form-label">Student firstName</label>
                <input type="text" class="form-control" id="exampleInputEmail1"
                  name="firstName" onChange={setData} value={inputval.firstName} //magic
                aria-describedby="emailHelp"/>
        </div>
        <div class="mb-3">
                <label htmlFor="exampleInputEmail1" class="form-label">Student lastName</label>
                <input type="text" class="form-control" id="exampleInputEmail1"
                  name="lastName" onChange={setData} value={inputval.lastName} //magic
                aria-describedby="emailHelp"/>
        </div>
        <div class="mb-3">
                <label htmlFor="exampleInputEmail1" class="form-label">Student Address</label>
                <input type="text" class="form-control" id="exampleInputEmail1"
                  name="address" onChange={setData} value={inputval.address}
                aria-describedby="emailHelp"/>
        </div>
        <div class="mb-3">
                <label htmlFor="exampleInputEmail1" class="form-label">Student dob</label>
                <input type="date" class="form-control" id="exampleInputEmail1"
                  name="dob" onChange={setData} value={inputval.dob}
                aria-describedby="emailHelp"/>
        </div>
        <div class="mb-3">
                <label htmlFor="exampleInputEmail1" class="form-label">Student contactNumber</label>
                <input type="text" class="form-control" id="exampleInputEmail1"
                  name="contactNumber" onChange={setData} value={inputval.contactNumber}
                aria-describedby="emailHelp"/>
        </div>
        <button className="btn btn-primary" onClick={addStudData} >Add Student</button>
        </form>
      </div>
    </>
  );
  
}
