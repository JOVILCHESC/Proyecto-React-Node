
import React, { useContext, useEffect, useState } from 'react';
import { Field, ErrorMessage, Form } from 'formik';
import styles from './CVRegistration.module.css';
import { Formik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../helpers/newAuthContext';

const initialValues = {
  jobTitle: '',
  company: '',
  description: '',
  skills: '',
  education: 'Media',
  yearsExperience: 0,
  languageSkills: 'Ingles',
  certifications: '',
  technicalSkills: 'Trabajo en equipo',
  cvFile: '', // Comentado para eliminar la implementación del archivo de curriculum
};

const validationSchema = Yup.object().shape({
  jobTitle: Yup.string().required('Job title is required'),
  company: Yup.string().required('Company is required'),
});

const CvForm = () => {
  const navigate = useNavigate();
  const { authState, setAuthState } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios
      .get('http://localhost:3000/auth/auth', {
        headers: {
          accessToken: localStorage.getItem('accessToken'),
        },
      })
      .then((response) => {
        if (!response.data.error) {
          setAuthState({
            username: response.data.username,
            id: response.data.id,
            status: true,
            role: response.data.role,
          });
        }
        setIsLoading(false);
      });
  }, [setAuthState]);

  const educationOptions = ['Media', 'Universitario', 'Posgrado', 'Otro'];
  const habilitiesOptions = ['Trabajo en equipo', 'Comunicación asertiva', 'Liderazgo', 'Resiliencia'];
  const languageLevels = ['Ingles', 'Español', 'Aleman', 'Frances'];

  if (isLoading) {
    return <div><h1 className="text-center">Loading...</h1></div>;
  }

  if (authState.role === 'user') {
    return (
      <div className={styles.createApplicantPage}>
        <Formik
          initialValues={initialValues}
          onSubmit={(values, { resetForm }) => {
            const accessToken = localStorage.getItem('accessToken');
            const headers = {
              headers: {
                accessToken,
              },
            };
          
            axios
              .post('http://localhost:3000/applicant', values, headers)
              .then((response) => {
                resetForm();
                navigate('/');
              })
              .catch((error) => {
                console.error('Error al crear solicitante:', error);
              });
          }}
          validationSchema={validationSchema}
        >
          {() => (
            <Form className={styles.formContainer}>
              <div className={styles.formRow}>
                <label>Nombre Completo:</label>
                <Field
                  className={styles.input}
                  autoComplete="off"
                  id="inputCreateApplicant"
                  name="jobTitle"
                  placeholder="(Ex. Nombre Completo...)"
                />
                <ErrorMessage name="jobTitle" component="span" className={styles.error} />
              </div>
              <div className={styles.formRow}>
                <label>Gmail:</label>
                <Field
                  className={styles.input}
                  type="email"
                  id="inputCreateApplicant"
                  name="company"
                  placeholder="(Ex. Email...)"
                />
                <ErrorMessage name="company" component="span" className={styles.error} />
              </div>
              <div className={styles.formRow}>
                <label>Descripcion:</label>
                <Field
                  className={styles.input}
                  autoComplete="off"
                  id="inputCreateApplicant"
                  name="description"
                  placeholder="(Ex. Descripcion...)"
                />
                <ErrorMessage name="description" component="span" className={styles.error} />
              </div>
              <div className={styles.formRow}>
                <label>Educacion:</label>
                <Field as="select" id="inputCreateApplicant" name="education" className={styles.input}>
                  {educationOptions.map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </Field>
                <ErrorMessage name="education" component="span" className={styles.error} />
              </div>
              <div className={styles.Date}>
                <label>Años de Experiencia:</label>
                <Field
                  className={styles.input}
                  autoComplete="off"
                  type="number"
                  id="inputCreateApplicant"
                  name="yearsExperience"
                />
                <ErrorMessage name="yearsExperience" component="span" className={styles.error} />
              </div>
              <div className={styles.formRow}>
                <label>Idioma:</label>
                <Field as="select" id="inputCreateApplicant" name="languageSkills" className={styles.input}>
                  {languageLevels.map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </Field>
                <ErrorMessage name="languageSkills" component="span" className={styles.error} />
              </div>
              <div className={styles.formRow}>
                <label>Certificaciones:</label>
                <Field
                  className={styles.input}
                  autoComplete="off"
                  id="inputCreateApplicant"
                  name="certifications"
                  placeholder="(Ex. Certifications...)"
                />
                <ErrorMessage name="certifications" component="span" className={styles.error} />
              </div>
              <div className={styles.formRow}>
                <label>Habilidades Blandas:</label>
                <Field as="select" id="inputCreateApplicant" name="technicalSkills" className={styles.input}>
                  {habilitiesOptions.map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </Field>
                <ErrorMessage name="technicalSkills" component="span" className={styles.error} />
              </div>
              <div className={styles.formRow}>
                <label>Habilidad destacable:</label>
                <Field
                  className={styles.input}
                  autoComplete="off"
                  id="inputDestacableHability"
                  name="destacableHability"
                  placeholder="( Programar...)"
                />
                <ErrorMessage name="destacableHability" component="span" className={styles.error} />
              </div>
              <div className={styles.formRow}>
                <button type="submit" className={styles.submitButton}> Subir Registro de CV</button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    );
  } else {
    return (
      <div>
        <h1 className="text-center">Access Denied</h1>
      </div>
    );
  }
};

export default CvForm;
