import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';

export default function Deletestud (){
  const {id} = useParams();
  const {email} = useParams();
  
  const [student, setStudent] = useState([]);
  const [user, setUser] = useState([]);
  const   fetchStudent =async()=>{
    const res = await axios.get(`http://localhost:5000/student/viewstud/${id}`);
    console.log(res);
    setStudent(res.data);
  };

  useEffect(()=>{
    fetchStudent();
  }, []);


  const fetchUser =async()=>{
    const res = await axios.get(`http://localhost:5000/deleteUser${email}`);
    console.log(res);
    setUser(res.data);
  };

  useEffect(()=>{
    fetchUser();
  }, []);

   
  const handleDelete = async(id)=>{
    const response = window.confirm("Are you sure you want to delete that?");
    if(response===true){
      const res =await axios.delete(`http://localhost:5000/student/deletestud/${id}`);

      // const res =await axios.delete(`http://localhost:5000/user/deleteUser/${id}`);

      console.log(res);
      if(res.status ===200){
        alert("Data Updated")
        window.location ="/student";
      }
      else{
        fetchStudent();
      }
    };
  };
  
const handleuserDelete = async(email)=>{
  const response = window.confirm("Are you sure you want to delete that?");
    //alert(response);
  if(response===true){
    const userRes =await axios.delete(`http://localhost:5000/user/deleteUser/${email}`);   

    console.log(userRes);
    if(userRes.status ===200){
      alert("Data Updated")
      window.location ="/student";
    }
  }
  else{
    fetchStudent();
  }
};

const handleButtonClick = async(e)=>{
  try {
    e.preventDefault();
    alert("hi");
    await handleDelete(student._id);
    await handleuserDelete(user.email);
  } catch (error) {
    console.error('Error:', error);
  }
};


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
                    <td>First Name : </td>
                    <td> {student?.firstName}</td>
                </tr>
                <tr>
                    <td>Last Name : </td>
                    <td> {student?.lastName}</td>
                </tr>
                <tr>
                    <td>Username : </td>
                    <td>{student?.email} </td>
                </tr>
                <tr>
                    <td>Password : </td>
                    <td>{student?.password} </td>
                </tr>
                <tr>
                    <td>DOB : </td>
                    <td> {student?.dob}</td>
                </tr>
                <tr>
                    <td>Contact Number : </td>
                    <td> {student?.contactNumber}</td>
                </tr>
                <tr>
                    <td>Address : </td>
                    <td> {student?.address}</td>
                </tr>
                <tr>
                    <td>Degree : </td>
                    <td> {student?.degreeName}</td>
                </tr>
            </table>
            <br/>
            <br/>
            <br/>
            <NavLink className="btn btn-primary" to="/student">Back to List</NavLink>
            <NavLink className="btn btn-danger me-3" onClick={handleButtonClick }>Delete</NavLink>
        </div>
        </>

    )

}