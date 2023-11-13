// import React, { useContext, useEffect, useState } from 'react';
// import axios from 'axios';
// import { AuthContext } from '../helpers/newAuthContext';
// // import { useNavigate } from 'react-router-dom';
// import styles from './UserHome.module.css';
// import UpdateRequestModal from './Modal'
// const AdminHome= () => {
//   const [requests, setRequests] = useState([]);
//   const { authState, setAuthState } = useContext(AuthContext);
//   const [isLoading, setIsLoading] = useState(true);
//   const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
//   const [selectedRequest, setSelectedRequest] = useState(null);
//   // let navigate = useNavigate();

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


//   const handleDeleteRequest = (requestId) => {
//     axios
//       .delete(`http://localhost:3000/requestReplacement/${requestId}`)
//       .then((response) => {
//         // Actualizar la lista de solicitudes después de la eliminación
//         const updatedRequests = requests.filter((request) => request.id !== requestId);
//         setRequests(updatedRequests);
//       })
//       .catch((error) => {
//         console.error("Error al eliminar la solicitud de reemplazo:", error);
//       });
//   };

//   useEffect(() => {
//     console.log('isUpdateModalOpen:', isUpdateModalOpen);
//   }, [isUpdateModalOpen]);
  
//   const handleUpdateRequest = (request) => {
//     setSelectedRequest(request);
//     setIsUpdateModalOpen(true);
    
//   };
  

//   const handleSubmitUpdate = (formData) => {
//     // Lógica para enviar los datos al servidor o realizar la acción necesaria
//     axios
//       .put(`http://localhost:3000/requestReplacement/${selectedRequest.id}`, formData)
//       .then((response) => {
//         // Actualizar la lista de solicitudes después de la actualización
//         const updatedRequests = requests.map((request) =>
//           request.id === selectedRequest.id ? { ...request, ...formData } : request
//         );
//         setRequests(updatedRequests);
//         setIsUpdateModalOpen(false);
//       })
//       .catch((error) => {
//         console.error("Error al actualizar la solicitud de reemplazo:", error);
//       });
//   };
  

//   if (isLoading) {
//     return (
//       <div>
//         <h1 className="text-center">Loading...</h1>
//       </div>
//     );
//   }

//   if (authState.role === 'admin') {
//       return (
//         <div className={styles.Requests}>
//           <h2>Solicitudes de Reemplazo</h2>
//           {requests.map((value, key) => (
//             <div className={styles.Request} key={key}>
//               <div className={styles.Field}>
//                 <div className={styles.Label}>Título:</div>
//                 <div className={styles.Value}>{value.titulo}</div>
//               </div>
//               <div className={styles.Field}>
//                 <div className={styles.Label}>Descripción:</div>
//                 <div className={styles.Value}>{value.descripcion}</div>
//               </div>
//               <div className={styles.Field}>
//                 <div className={styles.Label}>Funciones del Cargo:</div>
//                 <div className={styles.Value}>{value.funcionesCargo}</div>
//               </div>
//               <div className={styles.Field}>
//                 <div className={styles.Label}>Requerimientos del Cargo:</div>
//                 <div className={styles.Value}>{value.requerimientosCargo}</div>
//               </div>
//               <div className={styles.Field}>
//                 <div className={styles.Label}>Sueldo:</div>
//                 <div className={styles.Value}>{value.sueldo}</div>
//               </div>
//               <div className={styles.Field}>
//                 <div className={styles.Label}>Ubicación:</div>
//                 <div className={styles.Value}>{value.ubicacion}</div>
//               </div>
//               <div className={styles.Field}>
//                 <div className={styles.Label}>Seniority:</div>
//                 <div className={styles.Value}>{value.seniority}</div>
//               </div>
//               <div className={styles.Field}>
//                 <div className={styles.Label}>Duración del Trabajo:</div>
//                 <div className={styles.Value}>{value.duracionTrabajo}</div>
//               </div>
//               <div className={styles.Field}>
//                 <div className={styles.Label}>Sección:</div>
//                 <div className={styles.Value}>{value.seccion}</div>
//               </div>
//               <div className={styles.Field}>
//                 <div className={styles.Label}>Años de experiencia:</div>
//                 <div className={styles.Value}>{value.yearsExperience}</div>
//               </div>
//               <div>
//                 <button onClick={() => handleDeleteRequest(value.id)}>Eliminar</button>
//               </div>
//               <div>
//                 <button onClick={() => handleUpdateRequest(value)}>Actualizar</button>

//               </div>
//             </div>
//           ))}
//           {/* Agregar el modal para actualizar solicitudes */}
//           <UpdateRequestModal
//             show={isUpdateModalOpen}
//             handleClose={() => setIsUpdateModalOpen(false)}
//             handleUpdateRequest={handleSubmitUpdate}
//             selectedRequest={selectedRequest}
//           />
//         </div>
//       );
      
//   } else {
//     return (
//       <div>
//         <h1 className="text-center">Access Denied</h1>
//       </div>
//     );
//   }
// };

// export default AdminHome;
////////////////////////////////////////////////////////////////////////////// 

// import React, { useContext, useEffect, useState } from 'react';
// import axios from 'axios';
// import { AuthContext } from '../helpers/newAuthContext';
// // import { useNavigate } from 'react-router-dom';
// import styles from './UserHome.module.css';
// import UpdateRequestModal from './Modal'
// const AdminHome= () => {
//   const [requests, setRequests] = useState([]);
//   const { authState, setAuthState } = useContext(AuthContext);
//   const [isLoading, setIsLoading] = useState(true);
//   const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
//   const [selectedRequest, setSelectedRequest] = useState(null);
//   const [postulantes, setPostulantes] = useState([]);

//   // let navigate = useNavigate();

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


//   const handleDeleteRequest = (requestId) => {
//     axios
//       .delete(`http://localhost:3000/requestReplacement/${requestId}`)
//       .then((response) => {
//         // Actualizar la lista de solicitudes después de la eliminación
//         const updatedRequests = requests.filter((request) => request.id !== requestId);
//         setRequests(updatedRequests);
//       })
//       .catch((error) => {
//         console.error("Error al eliminar la solicitud de reemplazo:", error);
//       });
//   };

//   useEffect(() => {
//     console.log('isUpdateModalOpen:', isUpdateModalOpen);
//   }, [isUpdateModalOpen]);
  
//   const handleUpdateRequest = (request) => {
//     setSelectedRequest(request);
//     setIsUpdateModalOpen(true);
    
//   };
  

//   const handleSubmitUpdate = (formData) => {
//     // Lógica para enviar los datos al servidor o realizar la acción necesaria
//     axios
//       .put(`http://localhost:3000/requestReplacement/${selectedRequest.id}`, formData)
//       .then((response) => {
//         // Actualizar la lista de solicitudes después de la actualización
//         const updatedRequests = requests.map((request) =>
//           request.id === selectedRequest.id ? { ...request, ...formData } : request
//         );
//         setRequests(updatedRequests);
//         setIsUpdateModalOpen(false);
//       })
//       .catch((error) => {
//         console.error("Error al actualizar la solicitud de reemplazo:", error);
//       });
//   };
  
//   const handleVerPostulantes = (requestId) => {
//     axios
//       .get(`http://localhost:3000/requestReplacement/postulantes/${requestId}`)
//       .then((response) => {
//         setPostulantes(response.data);
//         console.log("servidor: ", response.data);
//       })
//       .catch((error) => {
//         console.error('Error al obtener los postulantes:', error);
        
//       });
//   };

//   const handleVerLista = (requestId) => {
//     axios
//       .get(`http://localhost:3000/postulate/obtenerUsuariosPonderados/${requestId}`)
//       .then((response) => {
//         setPostulantes(response.data);
//         console.log("servidor: ", response.data);
//       })
//       .catch((error) => {
//         console.error('Error al obtener los postulantes:', error);
//       });
//   };

  
  

//   if (isLoading) {
//     return (
//       <div>
//         <h1 className="text-center">Loading...</h1>
//       </div>
//     );
//   }

//   if (authState.role === 'admin') {
//       return (
//         <div className={styles.Requests}>
//           <h2>Solicitudes de Reemplazo</h2>
//           {requests.map((value, key) => (
//             <div className={styles.Request} key={key}>
//               <div className={styles.Field}>
//                 <div className={styles.Label}>Título:</div>
//                 <div className={styles.Value}>{value.titulo}</div>
//               </div>
//               <div className={styles.Field}>
//                 <div className={styles.Label}>Descripción:</div>
//                 <div className={styles.Value}>{value.descripcion}</div>
//               </div>
//               <div className={styles.Field}>
//                 <div className={styles.Label}>Funciones del Cargo:</div>
//                 <div className={styles.Value}>{value.funcionesCargo}</div>
//               </div>
//               <div className={styles.Field}>
//                 <div className={styles.Label}>Requerimientos del Cargo:</div>
//                 <div className={styles.Value}>{value.requerimientosCargo}</div>
//               </div>
//               <div className={styles.Field}>
//                 <div className={styles.Label}>Sueldo:</div>
//                 <div className={styles.Value}>{value.sueldo}</div>
//               </div>
//               <div className={styles.Field}>
//                 <div className={styles.Label}>Ubicación:</div>
//                 <div className={styles.Value}>{value.ubicacion}</div>
//               </div>
//               <div className={styles.Field}>
//                 <div className={styles.Label}>Seniority:</div>
//                 <div className={styles.Value}>{value.seniority}</div>
//               </div>
//               <div className={styles.Field}>
//                 <div className={styles.Label}>Duración del Trabajo:</div>
//                 <div className={styles.Value}>{value.duracionTrabajo}</div>
//               </div>
//               <div className={styles.Field}>
//                 <div className={styles.Label}>Sección:</div>
//                 <div className={styles.Value}>{value.seccion}</div>
//               </div>
//               <div className={styles.Field}>
//                 <div className={styles.Label}>Años de experiencia:</div>
//                 <div className={styles.Value}>{value.yearsExperience}</div>
//               </div>
//               <div>
//                 <button onClick={() => handleDeleteRequest(value.id)}>Eliminar</button>
//               </div>
//               <div>
//                 <button onClick={() => handleUpdateRequest(value)}>Actualizar</button>
//               </div>
//               <div>
//                 <button onClick={() => handleVerPostulantes(value.id)}>Ver Postulantes</button>
//               </div>
//               <div>
//                 <button onClick={() => handleVerLista(value.id)}>Ver Lista</button>
//                </div>
//             </div>
//           ))}
//           {postulantes.length > 0 && (
//   <div className={styles.Postulantes}>
//     <h2>Postulantes</h2>
//     {postulantes.map((postulante, index) => (
//       <div key={index}>
//         {/* Mostrar información del postulante según tus necesidades */}
//         <p>{postulante.Utente.username}</p>
//         {/* Agregar más información según sea necesario */}
//       </div>
//     ))}
//   </div>
// )}

//           {/* Agregar el modal para actualizar solicitudes */}
//           <UpdateRequestModal
//             show={isUpdateModalOpen}
//             handleClose={() => setIsUpdateModalOpen(false)}
//             handleUpdateRequest={handleSubmitUpdate}
//             selectedRequest={selectedRequest}
//           />
//         </div>
//       );
      
//   } else {
//     return (
//       <div>
//         <h1 className="text-center">Access Denied</h1>
//       </div>
//     );
//   }
// };

// export default AdminHome;




import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../helpers/newAuthContext';
import styles from './UserHome.module.css';
import UpdateRequestModal from './Modal'
import { useNavigate } from "react-router-dom";

const AdminHome= () => {
  const [requests, setRequests] = useState([]);
  const { authState, setAuthState } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [postulantes, setPostulantes] = useState([]);

  let navigate = useNavigate();

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
      });
  }, [setAuthState]);


  const handleDeleteRequest = (requestId) => {
    axios
      .delete(`http://localhost:3000/requestReplacement/${requestId}`)
      .then((response) => {
        // Actualizar la lista de solicitudes después de la eliminación
        const updatedRequests = requests.filter((request) => request.id !== requestId);
        setRequests(updatedRequests);
      })
      .catch((error) => {
        console.error("Error al eliminar la solicitud de reemplazo:", error);
      });
  };

  useEffect(() => {
    console.log('isUpdateModalOpen:', isUpdateModalOpen);
  }, [isUpdateModalOpen]);
  
  const handleUpdateRequest = (request) => {
    setSelectedRequest(request);
    setIsUpdateModalOpen(true);
    
  };
  

  const handleSubmitUpdate = (formData) => {
    // Lógica para enviar los datos al servidor o realizar la acción necesaria
    axios
      .put(`http://localhost:3000/requestReplacement/${selectedRequest.id}`, formData)
      .then((response) => {
        // Actualizar la lista de solicitudes después de la actualización
        const updatedRequests = requests.map((request) =>
          request.id === selectedRequest.id ? { ...request, ...formData } : request
        );
        setRequests(updatedRequests);
        setIsUpdateModalOpen(false);
      })
      .catch((error) => {
        console.error("Error al actualizar la solicitud de reemplazo:", error);
      });
  };
  
  const handleVerPostulantes = (requestId) => {
    axios
      .get(`http://localhost:3000/requestReplacement/postulantes/${requestId}`)
      .then((response) => {
        setPostulantes(response.data);
        console.log("servidor: ", response.data);
      })
      .catch((error) => {
        console.error('Error al obtener los postulantes:', error);
        
      });
  };

  const handleVerLista = (requestId) => {
    axios
      .get(`http://localhost:3000/postulate/obtenerUsuariosPonderados/${requestId}`)
      .then((response) => {
        setPostulantes(response.data);
        console.log("servidor: ", response.data);
        navigate(`/ponderation-list/${requestId}`);
      })
      .catch((error) => {
        console.error('Error al obtener los postulantes:', error);
      });
  };

  
  

  if (isLoading) {
    return (
      <div>
        <h1 className="text-center">Loading...</h1>
      </div>
    );
  }

  if (authState.role === 'admin') {
      return (
        <div className={styles.Requests}>
          <h2>Solicitudes de Reemplazo</h2>
          {requests.map((value, key) => (
            <div className={styles.Request} key={key}>
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
                <div className={styles.Label}>Ubicación:</div>
                <div className={styles.Value}>{value.ubicacion}</div>
              </div>
              <div className={styles.Field}>
                <div className={styles.Label}>Seniority:</div>
                <div className={styles.Value}>{value.seniority}</div>
              </div>
              <div className={styles.Field}>
                <div className={styles.Label}>Duración del Trabajo:</div>
                <div className={styles.Value}>{value.duracionTrabajo}</div>
              </div>
              <div className={styles.Field}>
                <div className={styles.Label}>Sección:</div>
                <div className={styles.Value}>{value.seccion}</div>
              </div>
              <div className={styles.Field}>
                <div className={styles.Label}>Años de experiencia:</div>
                <div className={styles.Value}>{value.yearsExperience}</div>
              </div>
              <div>
                <button onClick={() => handleDeleteRequest(value.id)}>Eliminar</button>
              </div>
              <div>
                <button onClick={() => handleUpdateRequest(value)}>Actualizar</button>
              </div>
              <div>
                <button onClick={() => handleVerPostulantes(value.id)}>Ver Postulantes</button>
              </div>
              <div>
                <button onClick={() => handleVerLista(value.id)}>Ver Lista</button>
              </div>
      
            </div>
          ))}
          {postulantes.length > 0 && (
  <div className={styles.Postulantes}>
    <h2>Postulantes</h2>
    {postulantes.map((postulante, index) => (
      <div key={index}>
        {/* Verifica si Utente está definido y tiene una propiedad username antes de acceder a ella */}
        {postulante.Utente && postulante.Utente.username && (
          <p>{postulante.Utente.username}</p>
        )}
        {/* Agregar más información según sea necesario */}
      </div>
    ))}
  </div>
)}

          {/* Agregar el modal para actualizar solicitudes */}
          <UpdateRequestModal
            show={isUpdateModalOpen}
            handleClose={() => setIsUpdateModalOpen(false)}
            handleUpdateRequest={handleSubmitUpdate}
            selectedRequest={selectedRequest}
          />
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

export default AdminHome;

