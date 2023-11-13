// import React from 'react';
// // import 'bootstrap/dist/css/bootstrap.min.css';
// import './App.css';
// import {BrowserRouter as Router, Routes, Route, Link} from "react-router-dom";
// import Home from './screens/Home';
// import CVRegistration from './screens/CVRegistration';
// import CVUnique from './screens/CVUnique';
// import { AuthContext } from "./helpers/AuthContext";
// import { useState, useEffect } from "react";
// import axios from "axios";
// import Login from './components/Login';
// import Registration from './components/Registration';
// // import NavbarComponent from './components/Navbar';


// function App() {

//   const [authState, setAuthState] = useState({
//     username: "",
//     id: 0,
//     status: false,
//   });

//   useEffect(() => {
//     axios
//       .get("http://localhost:3000/auth/auth", {
//         headers: {
//           accessToken: localStorage.getItem("accessToken"),
//         },
//       })
//       .then((response) => {
//         if (response.data.error) {
//           setAuthState({ ...authState, status: false });
//         } else {
//           setAuthState({
//             username: response.data.username,
//             id: response.data.id,
//             status: true,
//           });
//         }
//       });
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);
  

//   const logout = () => {
//     localStorage.removeItem("accessToken");
//     setAuthState({ username: "", id: 0, status: false });
//   };



//   return (
//     <div className='App'>
      
//       <AuthContext.Provider value={{ authState, setAuthState }}>
//       <Router>
//         {/* <NavbarComponent /> */}
//         <div className="navbar"> 
//           <Link to="/">Homem page</Link>
//           <Link to="/createCV">CV Registration</Link>
//           {!authState.status && (
//                 <>
//                   <Link to="/login" className={`nav-link ${authState.status ? '' : 'hidden'}`}> Login</Link>
//                   <Link to="/registration" className={`nav-link ${authState.status ? '' : 'hidden'}`}> Registration</Link>
//                 </>
//               )}

//         </div>
//         <div className="loggedInContainer">
//               <h1>{authState.username} </h1>
//               {authState.status && <button onClick={logout}> Logout</button>}
//         </div>
//         <div>
//           <Routes> {/* Cambio por "Switch" */}
//                 <Route path="/" element={<Home />} /> {/* Usa "element" */}
//                 <Route path="/home" element={<Home />} /> {/* Usa "element" */}
//                 <Route path="/createCV" element={<CVRegistration />} /> {/* Usa "element" */}
//                 <Route path="/applicant/:id" element={<CVUnique/>} />
//                 <Route path="/login" element={<Login/>} /> Usa "element"
//                 <Route path="/registration" element={<Registration />} /> Usa "element"
//                 {/* <Route path="/registro-profesional" element={<RegistroProfesional />} /> Usa "element" */}
//           </Routes>
//         </div>
//     </Router>
//     </AuthContext.Provider>
//   </div>
//   );
// }

// export default App;

//=====================================================================================
import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './screens/Home';
import CVRegistration from './screens/CVRegistration';
import CVUnique from './screens/CVUnique';
import { AuthContext } from './helpers/newAuthContext';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Login from './components/Login';
import Registration from './components/Registration';
import AdminDashboard from './screens/AdminHome';
import RequestReplacement from './screens/RequestReplacement';
import UserDashboard from './screens/UserHome';
import RequestReplacementUnique from './screens/RequestReplacementUnique';
// import CvEdit from './screens/CvEdit';
import CvForm from './screens/CvForm';
import CvEditForm from './screens/CvEditForm';
import PunctuationCalculator from './screens/Punctuation';
import RequestScores from './screens/RequestScores';
import Postulation from './screens/Postulation';
import ViewCv from './screens/ViewCv'
import PonderationList from './screens/PonderationList'
function App() {

  const { requestId } = useParams(); // Obtener 'requestId' de los parámetros de la URL

  const [authState, setAuthState] = useState({
    username: '',
    id: 0,
    status: 'registered',
    role: '', // Agrega el campo de rol al estado
  });
  

  useEffect(() => {
    axios
      .get('http://localhost:3000/auth/auth', {
        headers: {
          accessToken: localStorage.getItem('accessToken'),
        },
      })
      .then((response) => {
        if (response.status === 200) {
          setAuthState({
            username: response.data.username,
            id: response.data.id,
            status: 'registered',
            role: response.data.role,
          });
        } else {
          setAuthState({ ...AuthContext });
        }
      })
      .catch((error) => {
        console.error('Error al obtener información de autenticación:', error);
        setAuthState({ ...AuthContext });
      });
  }, []);
  

  const logout = () => {
    localStorage.removeItem('accessToken');
    setAuthState({ username: '', id: 0, status: false, role: '' }); // Asegúrate de limpiar el rol al cerrar sesión
  };

  return (
    <div className="App">
      <AuthContext.Provider value={{ authState, setAuthState }}>
        <Router>
        <div className="navbar">

  <Link to="/">Empleos Disponibles</Link>
  {requestId && <Link to={`/ponderation-list/${requestId}`}>Ver Lista</Link>}

  {authState.status && authState.role === 'user' && (
    <Link to="/CVRegister">Crear Curriculum</Link>
  )}
  {authState.status && authState.role === 'user' && (
    <Link to="/ViewCv">Ver Curriculum</Link>
  )}
  {/* Verifica si el rol del usuario es "admin" o "user" para mostrar los enlaces relacionados a administrador o usuario */}
  {authState.status && authState.role === 'admin' && (
    <Link to="/adminDashboard">Admin Home</Link>
  )}
  {authState.status && authState.role === 'user' && (
    <Link to="/userDashboard">User Home</Link>
  )}
  

  {/* Muestra el enlace de solicitud de reemplazo solo si el rol del usuario es "admin" */
  authState.status && authState.role === 'admin' && (
    <Link to="/adminRequestReplacement">Solicitud de Reemplazo</Link>
  )}
  

  {authState.status && authState.role === 'admin' && (
    <Link to="/calculate-scores">Lista</Link>
  )}

  {authState.status && authState.role === 'admin' &&(
    <Link to="/calculate-score">Calcular puntaje</Link>
  )}

  {/* Oculta los enlaces de login y registro cuando el rol es "user" o "admin" */}
  {(!authState.status || (authState.role !== 'user' && authState.role !== 'admin')) && (
    <Link to="/login">Login</Link>
  )}
  {(!authState.status || (authState.role !== 'user' && authState.role !== 'admin')) && (
    <Link to="/registration">Registration</Link>
  )}

  
    </div>

          <div className="loggedInContainer">
            <h1>{authState.username}</h1>
            {authState.status && <button onClick={logout}>Logout</button>}
          </div>
          <div>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/home" element={<Home />} />
              <Route path="/CVRegister" element={<CVRegistration />} />
              <Route path="/applicant/:id" element={<CVUnique />} />
              <Route path="/requestReplacement/:id" element={<RequestReplacementUnique />} />
              <Route path="/adminDashboard" element={<AdminDashboard />} />
              <Route path="/adminRequestReplacement" element={<RequestReplacement />} />
              <Route path="/userDashboard" element={<UserDashboard/>} />
              <Route path="/login" element={<Login />} />
              <Route path="/registration" element={<Registration />} />
              {/* <Route path="/CvEdit" element={<CvEdit/>}/> */}
              <Route path="/cv-form/:id" element={<CvForm />} />
              <Route path="/cv-edit-form/:id" element={<CvEditForm />} />
              {/* {una sola puntuacion} */}
              <Route path="/calculate-score" element={<PunctuationCalculator />} />
              {/* todas las puntuaciones */}
              <Route path="/calculate-scores" element={<RequestScores />} />
              <Route path="/postulation" element={<Postulation />} />
              <Route path="/ViewCv" element={<ViewCv />} />
              <Route path="/ponderation-list/:requestId" element={<PonderationList />} />

            </Routes>
          </div>
        </Router>
      </AuthContext.Provider>
    </div>
  );
}

export default App;




