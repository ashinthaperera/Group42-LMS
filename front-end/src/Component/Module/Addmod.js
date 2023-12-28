import React, { useState } from "react";
import { Link } from "react-router-dom";
//import axios from 'axios'; //other method
//import { useNavigate } from "react-router-dom";

export default function Addmod() {
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
    moduleCode:"",
    moduleName:"",
    
  });
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
    const addModData =async(e)=>{
      e.preventDefault();

      //magic
      const {moduleCode, moduleName}= inputval;
      //insert route url of the addstud of the backend (see the backend port is similar to link's port)
      const res = await fetch("http://localhost:5000/module/addmod",{  
          method:"POST",
          headers:{
            "Content-Type" : "application/json"
          },
          body : JSON.stringify({
          moduleCode: moduleCode,
          moduleName: moduleName,
          }),
      });

      const data =await res.json();
      alert(data);
      console.log(data);

      //validation
      if(res.status ===422 || !data){
        alert("Error");
      }
      else{
        setInputval(data);

        console.log(data);
        alert("Data Added")
        window.location ="/";
        //this if isnt working
        if(res.status ===200){
          alert("Data Added")
          window.location ="/module";
        }
      }

    }

  
  return (
    <>
      <div className="container mt-5">
        <form className="mx-auto w-50 shadow p-5" //onSubmit={Submit} //form submission
        >
        <Link className="btn btn-primary" to="/module">Home</Link>
        <h3 className="mt-5">Fill Module Details</h3>
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
        
        <button className="btn btn-primary" onClick={addModData} >Add Module</button>
        </form>
      </div>
    </>
  );
  
}
