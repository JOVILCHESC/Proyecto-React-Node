import React, { useContext, useEffect, useState } from 'react';
import styles from './RequestReplacement.module.css';
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../helpers/newAuthContext';

const initialValues = {
  titulo: '',
  descripcion: '',
  funcionesCargo: '',
  requerimientosCargo: '',
  sueldo: '',
  ubicacion: '',
  seniority: '',
  duracionTrabajo: '',
  seccion: '',
  yearsExperience: 0,
};

const validationSchema = Yup.object().shape({
  titulo: Yup.string().required('El título del trabajo es obligatorio'),
  descripcion: Yup.string().required('La descripción es obligatoria'),
  funcionesCargo: Yup.string().required('Las funciones del cargo son obligatorias'),
  requerimientosCargo: Yup.string().required('Los requerimientos del cargo son obligatorios'),
  sueldo: Yup.string().required('El sueldo es obligatorio'),
  ubicacion: Yup.string().required('La ubicación es obligatoria'),
  seniority: Yup.string().required('El seniority es obligatorio'),
  duracionTrabajo: Yup.string().required('Debes especificar la duración del trabajo'),
  seccion: Yup.string().required('La sección es obligatoria'),
});

const RequestReplacement = () => {

    const navigate = useNavigate();
    const onSubmit = (values, { resetForm }) => {
      axios.post("http://localhost:3000/requestReplacement", values)
        .then((response) => {
          console.log("Solicitud de reemplazo creada:", response.data);
          resetForm();
          navigate("/");
        })
        .catch((error) => {
          console.error("Error al crear solicitud de reemplazo:", error);
        });
    };


    const { authState, setAuthState } = useContext(AuthContext); // Importa setAuthState del contexto
    const [isLoading, setIsLoading] = useState(true);
  
    useEffect(() => {
      // Realiza la carga de datos del usuario de forma síncrona
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
          setIsLoading(false); // Marca la carga como completa
        });
    }, [setAuthState]); // Agrega setAuthState al arreglo de dependencias
    
  
    // Muestra un indicador de carga mientras se obtienen los datos del usuario
    if (isLoading) {
      return (
        <div>
          <h1 className="text-center">Loading...</h1>
        </div>
      );
    }

if (authState.role === 'admin') {
  return (
    <div className={styles.createApplicantPage}>
      <h2>Crear Solicitud de Reemplazo</h2>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
        <Form className={styles.formContainer}>
          <div className={styles.formRow}>
            <label>Título del Empleo/Cargo:</label>
            <Field className={styles.input} type="text" id="inputTitulo" name="titulo" />
            <ErrorMessage name="titulo" component="div" />
          </div>
          <div className={styles.formRow}>
            <label>Descripción del Trabajo:</label>
            <Field className={styles.input}  as="textarea" id="inputDescription" name="descripcion" />
            <ErrorMessage name="descripcion" component="div" />
          </div>
          <div className={styles.formRow}>
            <label>Funciones del Cargo:</label>
            <Field className={styles.input}  as="textarea" id="inputFuncionesCargo" name="funcionesCargo" />
            <ErrorMessage name="funcionesCargo" component="div" />
          </div>
          <div className={styles.formRow}>
            <label>Requerimientos del Cargo:</label>
            <Field className={styles.input} as="textarea" id="inputRequerimientosCargo" name="requerimientosCargo" />
            <ErrorMessage name="requerimientosCargo" component="div" />
          </div>
          <div className={styles.formRow}>
            <label>Sueldo:</label>
            <Field className={styles.input}  type="text" id="inputSueldo" name="sueldo" />
            <ErrorMessage name="sueldo" component="div" />
          </div>
          <div className={styles.formRow}>
            <label>Ubicación:</label>
            <Field className={styles.input} type="text" id="inputUbicacion" name="ubicacion" />
            <ErrorMessage name="ubicacion" component="div" />
          </div>
          <div className={styles.formRow}>
            <label>Habilidad obligatoria:</label>
            <Field className={styles.input}  type="text" id="inputSeniority" name="seniority" />
            <ErrorMessage name="seniority" component="div" />
          </div>
          <div className={styles.formRow}>
            <label>Duración del Trabajo:</label>
            <Field className={styles.input}  type="text" id="inputDuracionTrabajo" name="duracionTrabajo" />
          </div>
          <div className={styles.formRow}>
            <label>Sección:</label>
            <Field className={styles.input}  type="text" id="inputSeccion" name="seccion" />
            <ErrorMessage name="seccion" component="div" />
          </div>
          <div className={styles.formRow}>
            <label>Años de experiencia:</label>
            <Field className={styles.Years} type="number" id="inputYears" name="yearsExperience" />
            <ErrorMessage name="yearsExperience" component="div" />
          </div>
          <div className={styles.formRow}>
            <button type="submit" className={styles.submitButton}>Crear Solicitud</button>
          </div>
        </Form>
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
}

export default RequestReplacement;