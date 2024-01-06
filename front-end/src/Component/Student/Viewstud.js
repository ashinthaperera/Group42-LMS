import React, {useEffect,useState} from "react";
import { NavLink, useParams } from "react-router-dom";
import axios from "axios";

export default function Viewstud() {
  const {id} = useParams();
  const [student, setStudentData] = useState([]);
  const fetchStudent =async()=>{
    try {
      const res = await axios.get(`http://localhost:5000/student/viewstud/${id}`);
      console.log(res);
      setStudentData(res.data);
  } catch (error) {
      console.error("Error fetching student:", error);
  }
};
    

  useEffect(()=>{
    fetchStudent();
  }, []);

  return (
    <>
      <div className="container mt-5">
        <NavLink className="btn btn-primary" to="/student">Home</NavLink>
        <div className="row mt-5" >
          <div className="col-md-6">
            <ul class="list-group">
              <li class="list-group-item active" aria-current="true">Student Details</li>
              <li class="list-group-item">{student?.firstName}</li>
              <li class="list-group-item">{student?.lastName}</li>
              <li class="list-group-item">{student?.email}</li>
              <li class="list-group-item">{student?.password}</li>
              <li class="list-group-item">{student?.dob}</li>
              <li class="list-group-item">{student?.contactNumber}</li>
              <li class="list-group-item">{student?.address}</li>
              <li class="list-group-item">{student?.degreeName}</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};
