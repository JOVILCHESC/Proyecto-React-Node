
import React from 'react';
import styles from './CVRegistration.module.css';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const initialValues = {
  jobTitle: '',
  company: '',
  description: '',
  education: '',
  yearsExperience: 0,
  languageSkills: '',
  certifications: '',
  technicalSkills: '',
};

const validationSchema = Yup.object().shape({
  jobTitle: Yup.string().required('Job title is required'),
  company: Yup.string().required('Company is required'),
  description: Yup.string().required('Description is required'),
  education: Yup.string().required('Education is required'),
  yearsExperience: Yup.number().required('Years of experience is required').min(0),
  languageSkills: Yup.string().required('Language skills are required'),
  certifications: Yup.string().required('Certifications are required'),
  technicalSkills: Yup.string().required('Technical skills are required'),
});

const EditCvForm = (props) => {
  const { applicantId } = props;
  const navigate = useNavigate();

  const handleEditCv = (values) => {
    axios
      .put(`http://localhost:3000/applicant`, values)
      .then((response) => {
        console.log('Currículum actualizado:', response.data);
        // Puedes redirigir al usuario a una página de perfil o a donde desees.
        navigate('/');
      })
      .catch((error) => {
        console.error('Error al actualizar el currículum:', error);
      });
  };

  return (
    <div className={styles.createApplicantPage}>
      <Formik
        initialValues={{
          ...initialValues,
          id: applicantId,
        }}
        onSubmit={handleEditCv}
        validationSchema={validationSchema}
      >
        <Form className={styles.formContainer}>
          <div className={styles.formRow}>
            <label>Job Title:</label>
            <Field
              autoComplete="off"
              id="inputCreateApplicant"
              name="jobTitle"
              placeholder="(Ex. Job Title...)"
            />
            <ErrorMessage name="jobTitle" component="span" className={styles.error} />
          </div>
          <div className={styles.formRow}>
            <label>Company:</label>
            <Field
              autoComplete="off"
              id="inputCreateApplicant"
              name="company"
              placeholder="(Ex. Company...)"
            />
            <ErrorMessage name="company" component="span" className={styles.error} />
          </div>
          <div className={styles.formRow}>
            <label>Description:</label>
            <Field
              autoComplete="off"
              id="inputCreateApplicant"
              name="description"
              placeholder="(Ex. Description...)"
            />
            <ErrorMessage name="description" component="span" className={styles.error} />
          </div>
          <div className={styles.formRow}>
            <label>Education:</label>
            <Field
              autoComplete="off"
              id="inputCreateApplicant"
              name="education"
              placeholder="(Ex. Education...)"
            />
            <ErrorMessage name="education" component="span" className={styles.error} />
          </div>
          <div className={styles.formRow}>
            <label>Years of Experience:</label>
            <Field
              autoComplete="off"
              type="number"
              id="inputCreateApplicant"
              name="yearsExperience"
            />
            <ErrorMessage name="yearsExperience" component="span" className={styles.error} />
          </div>
          <div className={styles.formRow}>
            <label>Language Skills:</label>
            <Field
              autoComplete="off"
              id="inputCreateApplicant"
              name="languageSkills"
              placeholder="(Ex. Language Skills...)"
            />
            <ErrorMessage name="languageSkills" component="span" className={styles.error} />
          </div>
          <div className={styles.formRow}>
            <label>Certifications:</label>
            <Field
              autoComplete="off"
              id="inputCreateApplicant"
              name="certifications"
              placeholder="(Ex. Certifications...)"
            />
            <ErrorMessage name="certifications" component="span" className={styles.error} />
          </div>
          <div className={styles.formRow}>
            <label>Technical Skills:</label>
            <Field
              autoComplete="off"
              id="inputCreateApplicant"
              name="technicalSkills"
              placeholder="(Ex. Technical Skills...)"
            />
            <ErrorMessage name="technicalSkills" component="span" className={styles.error} />
          </div>
          <div className={styles.formRow}>
            <button type="submit" className={styles.submitButton}>
              Actualizar CV
            </button>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default EditCvForm;


