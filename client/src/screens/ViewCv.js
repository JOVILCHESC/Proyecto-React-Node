import React, { useEffect, useState } from 'react';
// import styles from './ViewCv.module.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

//ESTE COMPONENTE ES UN HOME GENERAL

const ViewCv = () => {
  // Comentarios modificados:
  // const [users, setusers] = useState([]);
  const [applicants, setApplicants] = useState([]);

  let navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:3000/applicant')
      .then((response) => {
        console.log(response.data); // Agrega este log para verificar el contenido
        setApplicants(response.data);
      })
      .catch((error) => {
        console.error('Error al obtener solicitantes:', error);
      });
  }, []);
  
  return (
    <div className="app">
      {/* Comentarios modificados: */}
      

      <div>
        <h2>Solicitantes</h2>
        {applicants.map((value, key) => (
          <div className="formApplicant" onClick={() => { navigate(`/applicant/${value.id}`); }} key={key}>
            <div className="applicants">
              <div className="jobTitle">{value.jobTitle}</div>
              <div className="company">{value.company}</div>
              <div className="description">{value.description}</div>
              <div className="education">{value.education}</div>
              <div className="yearsExperience">{value.yearsExperience}</div>
              <div className="languageSkills">{value.languageSkills}</div>
              <div className="certifications">{value.certifications}</div>
              <div className="technicalSkills">{value.technicalSkills}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewCv;