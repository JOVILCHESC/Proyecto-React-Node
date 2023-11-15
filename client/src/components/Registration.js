// import React from "react";
// import { Formik, Form, Field, ErrorMessage } from "formik";
// import * as Yup from "yup";
// import axios from "axios";
// import { useNavigate } from "react-router-dom"; // Importa useNavigate
// import styles from'./Registration.module.css';

// function Registration() {
//     const initialValues = {
//       username: "",
//       password: "",
//       role: "",
//     };
  
//     const validationSchema = Yup.object().shape({
//       username: Yup.string().min(3).max(15).required(),
//       password: Yup.string().min(4).max(20).required(),
//       role: Yup.string().required(),
//     });
  
//     const navigate = useNavigate(); // Obtén la función navigate
  
//     const onSubmit = (data) => {
//       axios.post("http://localhost:3000/auth/register", data).then(() => {
//         // Registro exitoso, redirige al usuario
//         console.log(data);
//         navigate("/"); // Redirige al usuario a la página de inicio de sesión
//       });
//     };
//   return (
//     <div>
//       <Formik
//         initialValues={initialValues}
//         onSubmit={onSubmit}
//         validationSchema={validationSchema}
//       >
//         <Form className={styles.formContainer}>
//           <label>Nombre de usuario: </label>
//           <ErrorMessage name="username" component="span" />
//           <Field
//             className={styles.Username}
//             autoComplete="off"
//             id="inputUsername"
//             name="username"
//             placeholder="(Ex. John123...)"
//           />

//           <label>Contraseña: </label>
//           <ErrorMessage name="password" component="span" />
//           <Field
//             className={styles.Password}
//             autoComplete="off"
//             type="password"
//             id="inputPassword"
//             name="password"
//             placeholder="Tu Contraseña..."
//           />

//           <label>Rol: </label>
//           <ErrorMessage name="role" component="span" />
//           <Field
//             className={styles.Role}
//             autoComplete="off"
//             id="inputRole"
//             name="role"
//             placeholder="user / admin" // Ajusta esto según tus roles
//           />

//           <button type="submit"> Crear cuenta</button>
//         </Form>
//       </Formik>
//     </div>
//   );
// }

// export default Registration;


import React from "react";
import axios from 'axios';
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, InputGroup, FormControl, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

function Registration() {
  const initialValues = {
    username: "",
    password: "",
    role: "",
    email: "",
    dateBorn: "",
    rut: "",
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string().min(3).max(15).required(),
    password: Yup.string().min(4).max(20).required(),
    role: Yup.string().required(),
    email: Yup.string().email("Invalid email").required(),
    dateBorn: Yup.date()
    .nullable()
    .required("Este campo es requerido")
    .test(
      "is-adult",
      "Debes ser mayor de 18 años",
      function (value) {
        const currentDate = new Date();
        const birthDate = new Date(value);
        const age = currentDate.getFullYear() - birthDate.getFullYear();

        // Verifica si el usuario tiene al menos 18 años
        return age >= 18;
      }
    ),
    rut: Yup.string(),
  });

  const navigate = useNavigate();

  const onSubmit = (data) => {
          axios.post("http://localhost:3000/auth/register", data).then(() => {
            // Registro exitoso, redirige al usuario
            console.log(data);
            navigate("/"); // Redirige al usuario a la página de inicio de sesión
          });
        };

  return (
    <Container>
      <Row className="justify-content-md-center mt-5">
        <Col md={6}>
          <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={validationSchema}
          >
            <Form className="text-center">
              <InputGroup className="mb-3">
                <InputGroup.Text id="inputUsername">Nombre de usuario</InputGroup.Text>
                <Field
                  as={FormControl}
                  type="text"
                  id="inputUsername"
                  name="username"
                  placeholder="(Ex. John123...)"
                  aria-label="Username"
                  aria-describedby="inputUsername"
                />
              </InputGroup>
              <InputGroup className="mb-3">
                <InputGroup.Text id="inputRut">RUT</InputGroup.Text>
                <Field
                  as={FormControl}
                  type="text"
                  id="inputRut"
                  name="rut"
                  placeholder="Tu RUT..."
                  aria-label="RUT"
                  aria-describedby="inputRut"
                />
              </InputGroup>
              <InputGroup className="mb-3">
                <InputGroup.Text id="inputRole">Rol</InputGroup.Text>
                <Field
                  as={FormControl}
                  component="select"
                  id="inputRole"
                  name="role"
                  aria-label="Role"
                  aria-describedby="inputRole"
                >
                  <option value="" disabled>
                    Usuario / Administrador
                  </option>
                  <option value="user">Usuario</option>
                  <option value="admin">Administrador</option>
                </Field>
              </InputGroup>
              <InputGroup className="mb-3">
                <InputGroup.Text id="inputEmail">Email</InputGroup.Text>
                <Field
                  as={FormControl}
                  type="email"
                  id="inputEmail"
                  name="email"
                  placeholder="Tu Email..."
                  aria-label="Email"
                  aria-describedby="inputEmail"
                />
              </InputGroup>
              <InputGroup className="mb-3">
                <InputGroup.Text id="inputDateBorn">Fecha de nacimiento</InputGroup.Text>
                <Field
                  as={FormControl}
                  type="date"
                  id="inputDateBorn"
                  name="dateBorn"
                  aria-label="DateBorn"
                  aria-describedby="inputDateBorn"
                />
              </InputGroup>
              <InputGroup className="mb-3">
                <InputGroup.Text id="inputPassword">Contraseña</InputGroup.Text>
                <Field
                  as={FormControl}
                  type="password"
                  id="inputPassword"
                  name="password"
                  placeholder="Tu Contraseña..."
                  aria-label="Password"
                  aria-describedby="inputPassword"
                />
              </InputGroup>

              <Button variant="primary" type="submit">
                Crear cuenta
              </Button>
            </Form>
          </Formik>
        </Col>
      </Row>
    </Container>
  );
}

export default Registration;
