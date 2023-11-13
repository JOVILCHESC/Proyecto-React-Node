// import React, { useContext, useEffect, useState } from 'react';
// import axios from 'axios';
// import { AuthContext } from '../helpers/newAuthContext';
// import { useNavigate } from 'react-router-dom';
// import styles from './UserHome.module.css';

// const UserDashboard = () => {
//   const [requests, setRequests] = useState([]);
//   const { authState, setAuthState } = useContext(AuthContext);
//   const [isLoading, setIsLoading] = useState(true);

//   let navigate = useNavigate();

//   useEffect(() => {
//     axios.get('http://localhost:3000/requestReplacement')
//       .then((response) => {
//         setRequests(response.data);
//       })
//       .catch((error) => {
//         console.error('Error al obtener las solicitudes de reemplazo en el frontend:', error);
//       });
//   }, []);

//   useEffect(() => {
//     axios.get('http://localhost:3000/auth/auth', {
//       headers: {
//         accessToken: localStorage.getItem('accessToken'),
//       },
//     })
//       .then((response) => {
//         console.log("Respuesta del servidor en userhome:", response.data);
//         if (!response.data.error) {
//           setAuthState({
//             username: response.data.username,
//             id: response.data.id,
//             status: true,
//             role: response.data.role,
//           });
//         }
//         setIsLoading(false);
//       });
//   }, [setAuthState]);

//   if (isLoading) {
//     return (
//       <div>
//         <h1 className="text-center">Loading...</h1>
//       </div>
//     );
//   }

//   if (authState.role === 'user') {
//     return (
//       <div className={styles.Requests}>
//         <h2>Solicitudes de Reemplazo</h2>
//         {requests.map((value, key) => (
//           <div className={styles.Request} onClick={() => { navigate(`/requestReplacement/${value.id}`); }} key={key}>
//             <div className={styles.Field}>
//               <div className={styles.Label}>Título:</div>
//               <div className={styles.Value}>{value.titulo}</div>
//             </div>
//             <div className={styles.Field}>
//               <div className={styles.Label}>Descripción:</div>
//               <div className={styles.Value}>{value.descripcion}</div>
//             </div>
//             <div className={styles.Field}>
//               <div className={styles.Label}>Funciones del Cargo:</div>
//               <div className={styles.Value}>{value.funcionesCargo}</div>
//             </div>
//             <div className={styles.Field}>
//               <div className={styles.Label}>Requerimientos del Cargo:</div>
//               <div className={styles.Value}>{value.requerimientosCargo}</div>
//             </div>
//             <div className={styles.Field}>
//               <div className={styles.Label}>Sueldo:</div>
//               <div className={styles.Value}>{value.sueldo}</div>
//             </div>
//             <div className={styles.Field}>
//               <div className={styles.Label}>Ubicacion:</div>
//               <div className={styles.Value}>{value.ubicacion}</div>
//             </div>
//             <div className={styles.Field}>
//               <div className={styles.Label}>seniority:</div>
//               <div className={styles.Value}>{value.seniority}</div>
//             </div>
//             <div className={styles.Field}>
//               <div className={styles.Label}>Seccion:</div>
//               <div className={styles.Value}>{value.seccion}</div>
//             </div>
//             <div className={styles.Field}>
//               <div className={styles.Label}>Años de experiencia:</div>
//               <div className={styles.Value}>{value.yearsExperience}</div>
//             </div>
//           </div>
//         ))}
//       </div>
//     );
//   } else {
//     return (
//       <div>
//         <h1 className="text-center">Access Denied</h1>
//       </div>
//     );
//   }
// };

// export default UserDashboard;

import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../helpers/newAuthContext';
// import { useNavigate } from 'react-router-dom';
import styles from './UserHome.module.css';

const UserDashboard = () => {
  const [requests, setRequests] = useState([]);
  const { authState, setAuthState } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);

  // let navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:3000/requestReplacement')
      .then((response) => {
        setRequests(response.data);
      })
      .catch((error) => {
        console.error('Error al obtener las solicitudes de reemplazo en el frontend:', error);
      });
  }, []);

  useEffect(() => {
    axios.get('http://localhost:3000/auth/auth', {
      headers: {
        accessToken: localStorage.getItem('accessToken'),
      },
    })
      .then((response) => {
        console.log("Respuesta del servidor en userhome:", response.data);
        if (!response.data.error) {
          setAuthState({
            username: response.data.username,
            id: response.data.id,
            status: true,
            role: response.data.role,
          });
        }
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error al autenticar al usuario:', error);
        setIsLoading(false);
      });
  }, [setAuthState, setIsLoading]);

  const handlePostulation = async (requestId) => {
    try {
      if (!authState.status || authState.role !== 'user') {
        throw new Error("Usuario no autenticado o no tiene permisos");
      }

      const response = await axios.post(`http://localhost:3000/postulate/solicitud/${requestId}/postular`, {}, {
        headers: {
          accessToken: localStorage.getItem('accessToken'),
        },
      });
      console.log('Postulation response:', response.data);
      // Aquí podrías mostrar un mensaje o realizar alguna acción adicional si es necesario
    } catch (error) {
      console.error('Error al postularse:', error);
      // Aquí podrías mostrar un mensaje de error al usuario si lo deseas
      if (error.response && error.response.status === 400) {
        alert("Ya te has postulado a esta solicitud");
      } else {
        alert("Error al procesar la postulación");
      }
    }
  };
  if (isLoading) {
    return (
      <div>
        <h1 className="text-center">Loading...</h1>
      </div>
    );
  }
    if (authState.role === 'user') {
    return (
      <div className={styles.Requests}>
        <h2>Solicitudes de Reemplazo</h2>
        {requests.map((value, key) => (  
          <div className={styles.Request} >
            <div className={styles.Field}>
              <div className={styles.Label}>Título:</div>
              <div className={styles.Value}>{value.titulo}</div>
            </div>
            <div className={styles.Field}>
              <div className={styles.Label}>Descripción:</div>
              <div className={styles.Value}>{value.descripcion}</div>
            </div>
            <div className={styles.Field}>
              <div className={styles.Label}>Funciones del Cargo:</div>
              <div className={styles.Value}>{value.funcionesCargo}</div>
            </div>
            <div className={styles.Field}>
              <div className={styles.Label}>Requerimientos del Cargo:</div>
              <div className={styles.Value}>{value.requerimientosCargo}</div>
            </div>
            <div className={styles.Field}>
              <div className={styles.Label}>Sueldo:</div>
              <div className={styles.Value}>{value.sueldo}</div>
            </div>
            <div className={styles.Field}>
              <div className={styles.Label}>Ubicacion:</div>
              <div className={styles.Value}>{value.ubicacion}</div>
            </div>
            <div className={styles.Field}>
              <div className={styles.Label}>seniority:</div>
              <div className={styles.Value}>{value.seniority}</div>
            </div>
            <div className={styles.Field}>
              <div className={styles.Label}>Seccion:</div>
              <div className={styles.Value}>{value.seccion}</div>
            </div>
            <div className={styles.Field}>
              <div className={styles.Label}>Años de experiencia:</div>
              <div className={styles.Value}>{value.yearsExperience}</div>
            </div>
            <div className={styles.Button} onClick={() => handlePostulation(value.id)}>
              Postularse
            </div>
          </div>
        ))}
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

export default UserDashboard;
