import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

export default function Alllec (){
  
  const [lecturers, setLecData] = useState([]);
  const fetchAllLecturer =async()=>{
    const res = await axios.get("http://localhost:5000/lecturer/");
    console.log(res);
    setLecData(res.data) //magic
  }
  

  useEffect(()=>{
    fetchAllLecturer();
  }, []);

  /*React Data Table*/
  // const columns =[
  //   {
  //     name : "ID",
  //     selector : row =>row.id
  //   },
  //   {
  //     name : "Name",
  //     selector : row =>row.name,
  //     sortable : true,
  //   },
  //   {
  //     name : "Address",
  //     selector : row =>row.address,
  //     sortable : true,
  //   },
  //   {
  //     name : "Subject",
  //     selector : row =>row.subject,
  //     sortable : true,
  //   },
  //   {
  //     name : "Mobile",
  //     selector : row =>row.mobile
  //   },
  //   {
  //     name : "Action",
  //     selector : row =>row.action
  //   },
    
  // ]
//   const data = students.map((student,i)=>(
//       {
//         id : i+1,
//         name : student?.name,
//         address : student?.address,
//         subject : student?.subject,
//         mobile : student?.mobile,
//         action : 
//         [
//           <NavLink className="btn btn-primary me-3" to={`/viewstud/${student._id}`} >View</NavLink>,
//           <NavLink className="btn btn-warning me-3" to={`/editstud/${student._id}`}>Edit</NavLink>,
//           <NavLink className="btn btn-danger me-3" to={`/deletestud/${student._id}`}>Delete</NavLink>
//           // <NavLink className="btn btn-danger me-3" onClick={()=> handleDelete(student._id)}>Delete</NavLink>
//         ]
//       }
//     ))

//   const [records, setRecords] = useState(data);

//   function handleFilter(e){
//     const searchTerm = e.target.value.toLowerCase();
//     if (searchTerm === '') {
//       // If the search term is empty, show all records
//       setRecords(data);
//     }
//     else{const newData = data.filter(row =>
//        row.name.toLowerCase().includes(searchTerm));
//        setRecords(newData);
//     }
//   }

    return(

        <>
      <div className="container mt-5">
            <div className="mt-3">
                <NavLink className="btn btn-primary" to="/lecturer/addlec">Add Lecturer</NavLink>
            </div>
        <table class="table mt-3">
          <thead>
            <tr className="table-success">
              <th scope="col">ID</th>
              <th scope="col">First Name</th>
              <th scope="col">Last Name</th>
              <th scope="col">Contact Number</th>
              <th scope="col">Email</th>
              <th scope="col">Role</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
          {
          lecturers.map((lecturer,i)=>(
            <tr key={lecturer._id}>
              <th scope="row">{i+1}</th>
              <td>{lecturer?.firstName}</td> 
              <td>{lecturer?.lastName}</td>
              <td>{lecturer?.contactNumber}</td>
              <td>{lecturer?.email}</td>
              <td>{lecturer?.role}</td>
              <td>
                <NavLink className="btn btn-primary me-3" to={`/lecturer/viewlec/${lecturer._id}`} >View</NavLink>
                <NavLink className="btn btn-warning me-3" to={`/lecturer/editlec/${lecturer._id}`}>Edit</NavLink>
                <NavLink className="btn btn-danger me-3" to={`/lecturer/deletelec/${lecturer._id}`}>Delete</NavLink>
                {/* <NavLink className="btn btn-danger me-3" onClick={()=> handleDelete(student._id)}>Delete</NavLink> */}
              </td>
            </tr>
          ))}
          
          
          
          </tbody>
        </table>

        {/* <div className="text-end"><input type="text" onChange={handleFilter}/>
          </div>
        <DataTable
            columns ={columns}
            data ={records}
            fixedHeader
            pagination
            >
        </DataTable> */}
      </div>
    </>

    )

}