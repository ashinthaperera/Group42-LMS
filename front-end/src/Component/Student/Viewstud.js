import React, {useEffect,useState} from "react";
import { NavLink, useParams } from "react-router-dom";
import axios from "axios";
import Header from "../Header";

export default function Viewstud() {
//get the parameters (id) from url and store them
const {id} = useParams();
  // data single fetching (useState = hook)
  const [student, setStudData] = useState([]); //var student, assigning to setStudData
  const fetchStudent =async()=>{
    try {
      //retrieving the data from the backend/db
      const res = await axios.get(`http://localhost:5000/student/viewstud/${id}`);
      console.log(res);
      setStudData(res.data); // magic
  } catch (error) {
      console.error("Error fetching student:", error);
  }
};
    
  //   const res = await axios.get(`http://localhost:5000/viewstud/${id}`);
  //   console.log(res);
  //   setStudData(res.data) //magic
  // }

  useEffect(()=>{
    fetchStudent();
  }, []);

  return (
    <>
      <div className="container mt-5">
      {/* <Header category="Page" title="Customers" /> */}
        <NavLink className="btn btn-primary" to="/student">Home</NavLink>
        <div className="row mt-5" >
          <div className="col-md-6">
            <ul class="list-group">
              <li class="list-group-item active" aria-current="true">Student Details</li>
              <li class="list-group-item">{student?.firstName}</li>
              <li class="list-group-item">{student?.lastName}</li>
              <li class="list-group-item">{student?.address}</li>
              <li class="list-group-item">{student?.dob}</li>
              <li class="list-group-item">{student?.contactNumber}</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
