import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import axios from 'axios';
import styles from './CVUnique.module.css'; // Importa el módulo CSS

const CVUnique = () => {
  const { id } = useParams();
  const [uniqueCV, setUniqueCV] = useState({});

  useEffect(() => {
    axios.get(`http://localhost:3000/applicant/obtainByID/${id}`)
      .then((response) => {
        setUniqueCV(response.data);
      })
      .catch((error) => {
        console.error('Error al mostrar los solicitantes:', error);
      });
  }, [id]);

  return (
    <div className={styles.CVUniqueContainer}>
      <div className={styles.CVField}>
        <label>Nombre Completo:</label>
        <div>{uniqueCV.jobTitle}</div>
      </div>
      <div className={styles.CVField}>
        <label>Gmail:</label>
        <div>{uniqueCV.company}</div>
      </div>
      <div className={styles.CVField}>
        <label>Descripcion:</label>
        <div className={styles.CVDescription}>{uniqueCV.description}</div>
      </div>
      
      <div className={styles.CVField}>
        <label>Educacion:</label>
        <div className={styles.CVLargeText}>{uniqueCV.education}</div>
      </div>
      <div className={styles.CVField}>
        <label>Años de experiencia:</label>
        <div>{uniqueCV.yearsExperience}</div>
      </div>
      <div className={styles.CVField}>
        <label>Idiomas:</label>
        <div>{uniqueCV.languageSkills}</div>
      </div>
      <div className={styles.CVField}>
        <label>Certificaciones:</label>
        <div>{uniqueCV.certifications}</div>
      </div>
      <div className={styles.CVField}>
        <label>Habilidades Blandas:</label>
        <div>{uniqueCV.technicalSkills}</div>
      </div>
    </div>
  );
  
}

export default CVUnique;

