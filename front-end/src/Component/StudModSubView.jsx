import React, {useEffect, useState} from 'react';
import axios from 'axios';

const StudModSubView = () => {
    const [lecMaterials, setLecMaterials] = useState([]);

    useEffect(() => {
        getMaterials();
    }, []);

    const getMaterials = async () => {
        try {
            const file = await axios.get("http://localhost:5000/studmodulesub/get-studmodSubfiles");
            setLecMaterials(file.data.data);
        } catch(error) {
            console.error('Error fetching materials: ', error);
        }
    };

    const ViewLecMaterials = (pdf) => {
        window.open(`http://localhost:5000/studmodSubfiles/${pdf}`, "_blank", "noreferrer");
    };

  return (
    <div className="container mt-4">
            <h2>Add Student Submission</h2>
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

export default StudModSubView