// import React, { useState, useContext } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { AuthContext } from "../helpers/AuthContext";

// function Login() {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const { setAuthState } = useContext(AuthContext);

//   let navigate = useNavigate();

//   const login = () => {
//     const data = { username: username, password: password };
//     axios.post("http://localhost:3000/auth/login", data).then((response) => {
//       if (response.data.error) {
//         alert(response.data.error);
//       } else {
//         localStorage.setItem("accessToken", response.data.token);
//         setAuthState({
//           username: response.data.username,
//           id: response.data.id,
//           status: true,
//         });
//         navigate("/");
//       }
//     });
//   };
//   return (
//     <div className="loginContainer">
//       <label>Username:</label>
//       <input
//         type="text"
//         onChange={(event) => {
//           setUsername(event.target.value);
//         }}
//       />
//       <label>Password:</label>
//       <input
//         type="password"
//         onChange={(event) => {
//           setPassword(event.target.value);
//         }}
//       />

//       <button onClick={login}> Login </button>
//     </div>
//   );
// }

// export default Login;


//////////////////////////////////////////////////////////////
import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../helpers/newAuthContext";
import { Form, Button, Container, Row, Col, InputGroup, FormControl } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState(""); // Agrega el estado para el campo de email
  const { setAuthState } = useContext(AuthContext);

  const navigate = useNavigate();

  const login = () => {
    const data = { username: username, password: password, email: email }; // Incluye el campo de email en los datos
    axios.post("http://localhost:3000/auth/login", data).then((response) => {
      if (response.data.error) {
        alert(response.data.error);
      } else {
        localStorage.setItem("accessToken", response.data.token);
        console.log("El token es:", response.data.token);
        console.log("Respuesta del servidor:", response.data);
        setAuthState({
          username: response.data.username,
          id: response.data.id,
          status: true,
          role: response.data.role,
        });
        navigate("/");
      }
    });
  };

  return (
    <Container>
      <Row className="justify-content-md-center mt-5">
        <Col md={6}>
          <Form className="text-center">
            <InputGroup className="mb-3">
              <InputGroup.Text id="inputUsername">Nombre de usuario</InputGroup.Text>
              <FormControl
                type="text"
                onChange={(event) => setUsername(event.target.value)}
                aria-label="Username"
                aria-describedby="inputUsername"
              />
            </InputGroup>
            <InputGroup className="mb-3">
              <InputGroup.Text id="inputEmail">Correo Electrónico</InputGroup.Text>
              <FormControl
                type="email"
                onChange={(event) => setEmail(event.target.value)}
                aria-label="Email"
                aria-describedby="inputEmail"
              />
            </InputGroup>
            <InputGroup className="mb-3">
              <InputGroup.Text id="inputPassword">Contraseña</InputGroup.Text>
              <FormControl
                type="password"
                onChange={(event) => setPassword(event.target.value)}
                aria-label="Password"
                aria-describedby="inputPassword"
              />
            </InputGroup>

            <Button variant="primary" onClick={login}>
              Iniciar sesión
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default Login;
