import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';

export default function Deletemod (){
  const {id} = useParams()
  
  const [module, setModData] = useState([]);
  const fetchModule =async()=>{
    const res = await axios.get(`http://localhost:5000/module/viewmod/${id}`);
    console.log(res);
    setModData(res.data);
  };

  useEffect(()=>{
    fetchModule();
  }, []);


  const handleDelete = async(id)=>{
    const response = window.confirm("Are you sure you want to delete that?");
    
    if(response===true){
      const res =await axios.delete(`http://localhost:5000/module/deletemod/${id}`);

      console.log(res);
      if(res.status ===200){
        alert("Data Updated")
        window.location ="/module/";
      }
    }
    else{
      fetchModule();
    }
  }

    return(

        <>
        <div>
            <h3>Delete Module</h3>
            <h4>Are you sure you want to delete this?</h4>
            <h4>Module : </h4>
            <hr/>
            <br/>
            <table>
                <tr>
                    <td>Module Code : </td>
                    <td> {module?.moduleCode}</td>
                </tr>
                <tr>
                    <td>Module Name : </td>
                    <td>{module?.moduleName} </td>
                </tr>
                <tr>
                    <td>Degree : </td>
                    <td>{module?.degreeName} </td>
                </tr>
                <tr>
                    <td>Lecturer : </td>
                    <td>{module?.firstName} </td>
                </tr>
                
            </table>
            <br/>
            <br/>
            <br/>
            <NavLink className="btn btn-primary" to="/module/">Back to List</NavLink>
            <NavLink className="btn btn-danger me-3" onClick={()=> handleDelete(module._id)}>Delete</NavLink>
        </div>
        </>

    );

};