import React, {useEffect,useState} from "react";
import { NavLink, useParams } from "react-router-dom";
import axios from "axios";

export default function Viewmod() {
//get the parameters (id) from url and store them
const {id} = useParams();
  // data single fetching (useState = hook)
  const [module, setModData] = useState([]); //var student, assigning to setStudData
  const fetchModule =async()=>{
    try {
      //retrieving the data from the backend/db
      const res = await axios.get(`http://localhost:5000/module/viewmod/${id}`);
      console.log(res);
      setModData(res.data); // magic
  } catch (error) {
      console.error("Error fetching module:", error);
  }
};
    
  //   const res = await axios.get(`http://localhost:5000/viewstud/${id}`);
  //   console.log(res);
  //   setStudData(res.data) //magic
  // }

  useEffect(()=>{
    fetchModule();
  }, []);

  return (
    <>
      <div className="container mt-5">
        <NavLink className="btn btn-primary" to="/module/">Home</NavLink>
        <div className="row mt-5" >
          <div className="col-md-6">
            <ul class="list-group">
              <li class="list-group-item active" aria-current="true">Module Details</li>
              <li class="list-group-item">{module?.moduleCode}</li>
              <li class="list-group-item">{module?.moduleName}</li>
              
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
