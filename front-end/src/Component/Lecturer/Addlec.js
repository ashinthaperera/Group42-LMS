import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Addlec (){
  const [inputval,setInputval] = useState ({ //in the start the details will empty
    firstName:"",
    lastName:"",
    contactNumber:"",
    email:"",
    role:"",
  })

  /*hooks*/
  const setData=(e)=>{
    console.log(e.target.value)
    const {name,value}=e.target;
    setInputval((preval)=>{
      return{
        ...preval,[name] :value
      }
    })
  }

    //after the api works (through postman checking)
    const addLecData =async(e)=>{
      e.preventDefault();

      //magic
      const {firstName,lastName,contactNumber,email,role}=inputval;
      //insert route url of the addstud of the backend (see the backend port is similar to link's port)
      const res = await fetch("http://localhost:5000/lecturer/addlec",{  
          method:"POST",
          headers:{
            "Content-Type" : "application/json"
          },
          body : JSON.stringify({
            firstName,lastName,contactNumber,email,role
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
        window.location ="/lecturer";
        //this if isnt working
        if(res.status ===200){
          alert("Data Added")
          window.location ="/lecturer";
        }
      }

    }

    return(

        <>
        <div className="container mt-5">
          <form className="mx-auto w-50 shadow p-5" //onSubmit={Submit} //form submission
          >
          <Link className="btn btn-primary" to="/lecturer">Home</Link>
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
                    name="lastName" onChange={setData} value={inputval.lastName}
                  aria-describedby="emailHelp"/>
          </div>
          <div class="mb-3">
                  <label htmlFor="exampleInputEmail1" class="form-label">Student contactNumber</label>
                  <input type="text" class="form-control" id="exampleInputEmail1"
                    name="contactNumber" onChange={setData} value={inputval.contactNumber}
                  aria-describedby="emailHelp"/>
          </div>
          <div class="mb-3">
                  <label htmlFor="exampleInputEmail1" class="form-label">Student email</label>
                  <input type="text" class="form-control" id="exampleInputEmail1"
                    name="email" onChange={setData} value={inputval.email}
                  aria-describedby="emailHelp"/>
          </div>
          <div class="mb-3">
                  <label htmlFor="exampleInputEmail1" class="form-label">Student role</label>
                  <input type="text" class="form-control" id="exampleInputEmail1"
                    name="role" onChange={setData} value={inputval.role}
                  aria-describedby="emailHelp"/>
          </div>
          <button className="btn btn-primary" onClick={addLecData} >Add Lecturer</button>
          </form>
        </div>
      </>

    )

}