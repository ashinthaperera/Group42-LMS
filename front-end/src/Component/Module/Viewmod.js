import React, {useEffect,useState} from "react";
import { NavLink, useParams } from "react-router-dom";
import axios from "axios";

export default function Viewmod() {
  const {id} = useParams();
  const [module, setModData] = useState([]);
  const fetchModule =async()=>{
    try {
      const res = await axios.get(`http://localhost:5000/module/viewmod/${id}`);
      console.log(res);
      setModData(res.data);
  } catch (error) {
      console.error("Error fetching module:", error);
  }
};

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
              <li class="list-group-item">{module?.degreeName}</li>
              <li class="list-group-item">{module?.firstName}</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
