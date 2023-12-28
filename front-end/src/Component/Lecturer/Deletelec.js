import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';

export default function Deletelec (){
    const {id} = useParams()
    // data single fetching 
    const [lecturer, setLecData] = useState([]);
    const fetchLecturer =async()=>{
      const res = await axios.get(`http://localhost:5000/lecturer/viewlec/${id}`);
      console.log(res);
      setLecData(res.data) //magic
    }
  
    useEffect(()=>{
      fetchLecturer();
    }, []);
  
    //data delete 
    const handleDelete = async(id)=>{
      const response = window.confirm("Are you sure you want to delete that?");
      //alert(response);
      if(response===true){
        const res =await axios.delete(`http://localhost:5000/lecturer/deletelec/${id}`);
  
        console.log(res);
      if(res.status ===200){
        alert("Data Updated")
        window.location ="/lecturer";
      }
      //   if(res.status===200){
      //     fetchStudent();
      //   }
      }
      else{
        fetchLecturer();
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
                    <td>First name : </td>
                    <td> {lecturer?.firstName}</td>
                </tr>
                <tr>
                    <td>Last name : </td>
                    <td>{lecturer?.lastName} </td>
                </tr>
                <tr>
                    <td>Mobile : </td>
                    <td>{lecturer?.contactNumber} </td>
                </tr>
                <tr>
                    <td>Email : </td>
                    <td> {lecturer?.email}</td>
                </tr>
                <tr>
                    <td>Role : </td>
                    <td> {lecturer?.role}</td>
                </tr>
            </table>
            <br/>
            <br/>
            <br/>
            <NavLink className="btn btn-primary" to="/lecturer">Back to List</NavLink>
            <NavLink className="btn btn-danger me-3" onClick={()=> handleDelete(lecturer._id)}>Delete</NavLink>
        </div>
        </>

    )

}