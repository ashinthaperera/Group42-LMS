import React, {useEffect, useState} from 'react';
import axios from 'axios';
// import { selectUser } from "../redux/user/userSlice";


const ModSubmissionView = () => {
    const [lecMaterials, setLecMaterials] = useState([]);

    
    useEffect(() => {
        getMaterials();
    }, []);

    const getMaterials = async () => {
        try {
            const file = await axios.get("http://localhost:5000/modulesub/get-modSubfiles");
            setLecMaterials(file.data.data);
        } catch(error) {
            console.error('Error fetching materials: ', error);
        }
    };

    const ViewLecMaterials = (pdf) => {
        window.open(`http://localhost:5000/modSubfiles/${pdf}`, "_blank", "noreferrer");
    };
  return (
    <div className="container mt-4">
            <h2>View Module Submission</h2>
            <div className="row">
                {lecMaterials.map((lecMaterial) => (
                    <div key={lecMaterial._id} className="col-md-4 mb-3">
                        <div className="card">
                            <div className="card-body">
                                <div className="card-title">{lecMaterial.title}</div>
                                <div className="card-title">{lecMaterial.description}</div>
                                <button 
                                    className="btn btn-primary me-2"
                                    onClick={() => ViewLecMaterials(lecMaterial.pdf)}
                                    >
                                        View
                                    </button>

                            </div>
                        </div>
                    </div>
                ))}
            </div>

        </div>
  )
}

export default ModSubmissionView