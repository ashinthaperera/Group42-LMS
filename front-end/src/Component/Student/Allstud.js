import React, {useEffect,useState} from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
// import DataTable from "react-data-table-component";


export default function Allstud() {

  /*other method*/
  // const[students, setStudents] =useState([{
  //   Name : "",Address: "",Subject:"",Mobile:""
  // }]);

  
  const [students, setStudData] = useState([]);
  const fetchAllStudent =async()=>{
    const res = await axios.get("http://localhost:5000/student/");
    console.log(res);
    setStudData(res.data) //magic
  }
  

  useEffect(()=>{
    // fetch('/')
    //   .then(response => response.json())
    //   .then(data => setStudents(data))
    //   .catch(error => console.error('Error fetching student data:', error));

    fetchAllStudent();
  }, []);
  //   axios.get('http://localhost:5000/')
  //   .then(result => setStudents(result.data))
  //   .catch(err=>console.log(err))

  // }, [])

  //delete function
  // const handleDelete = async(id)=>{
  //   const response = window.confirm("Are you sure you want to do that?");
  //   alert(response);
  //   if(response===true){
  //     const res =await axios.delete(`http://localhost:5000/deletestud/${id}`);
  //     if(res.status===200){
  //       fetchAllStudent();
  //     }
  //   }
  //   else{
  //     fetchAllStudent();
  //   }
  // }

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
  // const data = students.map((student,i)=>(
  //     {
  //       id : i+1,
  //       name : student?.name,
  //       address : student?.address,
  //       subject : student?.subject,
  //       mobile : student?.mobile,
  //       action : 
  //       [
  //         <NavLink className="btn btn-primary me-3" to={`/viewstud/${student._id}`} >View</NavLink>,
  //         <NavLink className="btn btn-warning me-3" to={`/editstud/${student._id}`}>Edit</NavLink>,
  //         <NavLink className="btn btn-danger me-3" to={`/deletestud/${student._id}`}>Delete</NavLink>
  //         // <NavLink className="btn btn-danger me-3" onClick={()=> handleDelete(student._id)}>Delete</NavLink>
  //       ]
  //     }
  //   ))

  // const [records, setRecords] = useState(data);

  // function handleFilter(e){
  //   // const newData = data.filter(row =>{
  //   //   return row.name.toLowerCase().includes(e.target.value.toLowerCase())
  //   // })
  //   // setRecords(newData)
  //   const searchTerm = e.target.value.toLowerCase();
  //   if (searchTerm === '') {
  //     // If the search term is empty, show all records
  //     setRecords(data);
  //   }
  //   else{const newData = data.filter(row =>
  //      row.name.toLowerCase().includes(searchTerm));
  //      setRecords(newData);
  //   }
  // }
  return (
    <>
      <div className="container mt-5">
            <div className="mt-3">
                <NavLink className="btn btn-primary" to="/student/addstud">Add Student</NavLink>
            </div>
        <table class="table mt-3">
          <thead>
            <tr className="table-success">
              <th scope="col">ID</th>
              <th scope="col">First Name</th>
              <th scope="col">Last Name</th>
              <th scope="col">Address</th>
              <th scope="col">DOB</th>
              <th scope="col">Mobile</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
          {
          students.map((student,i)=>(
            <tr key={student._id}>
              <th scope="row">{i+1}</th>
              <td>{student?.firstName}</td> 
              <td>{student?.lastName}</td>
              <td>{student?.address}</td>
              <td>{student?.dob}</td>
              <td>{student?.contactNumber}</td>
              <td>
                <NavLink className="btn btn-primary me-3" to={`/student/viewstud/${student._id}`} >View</NavLink>
                <NavLink className="btn btn-warning me-3" to={`/student/editstud/${student._id}`}>Edit</NavLink>
                <NavLink className="btn btn-danger me-3" to={`/student/deletestud/${student._id}`}>Delete</NavLink>
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
  );
}
