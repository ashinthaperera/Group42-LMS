import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';

export default function Viewlec (){
    const {id} = useParams();
    // data single fetching (useState = hook)
    const [lecturer, setLecData] = useState([]); //var student, assigning to setStudData
    const fetchLecturer =async()=>{
      try {
        //retrieving the data from the backend/db
        const res = await axios.get(`http://localhost:5000/lecturer/viewlec/${id}`);
        console.log(res);
        setLecData(res.data); // magic
    } catch (error) {
        console.error("Error fetching lecturer:", error);
    }
  };
      
    //   const res = await axios.get(`http://localhost:5000/viewstud/${id}`);
    //   console.log(res);
    //   setStudData(res.data) //magic
    // }
  
    useEffect(()=>{
      fetchLecturer();
    }, []);

    return(
        <>
        <div className="container mt-5">
          <NavLink className="btn btn-primary" to="/lecturer">Home</NavLink>
          <div className="row mt-5" >
            <div className="col-md-6">
              <ul class="list-group">
                <li class="list-group-item active" aria-current="true">Lecturer Details</li>
                <li class="list-group-item">{lecturer?.firstName}</li>
                <li class="list-group-item">{lecturer?.lastName}</li>
                <li class="list-group-item">{lecturer?.contactNumber}</li>
                <li class="list-group-item">{lecturer?.email}</li>
                <li class="list-group-item">{lecturer?.role}</li>
              </ul>
            </div>
          </div>
        </div>
      </>

    )

}