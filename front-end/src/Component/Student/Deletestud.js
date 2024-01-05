import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';

export default function Deletestud (){
    const {id} = useParams()
  // data single fetching 
  const [student, setStudData] = useState([]);
  const fetchStudent =async()=>{
    const res = await axios.get(`http://localhost:5000/student/viewstud/${id}`);
    console.log(res);
    setStudData(res.data) //magic
  }

  useEffect(()=>{
    fetchStudent();
  }, []);

  //data delete 
  const handleDelete = async(id)=>{
    const response = window.confirm("Are you sure you want to delete that?");
    //alert(response);
    if(response===true){
      const res =await axios.delete(`http://localhost:5000/student/deletestud/${id}`);

      // const res =await axios.delete(`http://localhost:5000/user/deleteUser/${id}`);

      console.log(res);
    if(res.status ===200){
      alert("Data Updated")
      window.location ="/student";
    }
    //   if(res.status===200){
    //     fetchStudent();
    //   }
    }
    else{
      fetchStudent();
    }
  }

    return(

        <>
        <div>
            <h3>Delete Lecturer</h3>
            <h4>Are you sure you want to delete this?</h4>
            <h4>Lecturer : </h4>
            <hr/>
            <br/>
            <table>
                <tr>
                    <td>User firstName : </td>
                    <td> {student?.firstName}</td>
                </tr>
                <tr>
                    <td>User lastName : </td>
                    <td> {student?.lastName}</td>
                </tr>
                <tr>
                    <td>Address : </td>
                    <td>{student?.address} </td>
                </tr>
                <tr>
                    <td>dob : </td>
                    <td>{student?.dob} </td>
                </tr>
                <tr>
                    <td>contactNumber : </td>
                    <td> {student?.contactNumber}</td>
                </tr>
            </table>
            <br/>
            <br/>
            <br/>
            <NavLink className="btn btn-primary" to="/student">Back to List</NavLink>
            <NavLink className="btn btn-danger me-3" onClick={()=> handleDelete(student._id)}>Delete</NavLink>
        </div>
        </>

    )

}