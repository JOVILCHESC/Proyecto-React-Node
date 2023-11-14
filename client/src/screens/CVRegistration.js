// import React, { useContext, useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
// import { AuthContext } from '../helpers/newAuthContext';
// import axios from 'axios';

// const CVRegistration = () => {
//   const { authState } = useContext(AuthContext);
//   const [hasCV, setHasCV] = useState(false);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     // Obtén el token de acceso del almacenamiento local (localStorage)
//     const accessToken = localStorage.getItem('accessToken');

//     // Configura la solicitud HTTP con el token de acceso
//     axios.get(`http://localhost:3000/applicant/user-with-cv`, {
//       headers: {
//         Authorization: `Bearer ${accessToken}`,
//       },
//     })
      
//       .then((response) => {
//         setHasCV(!!response.data);
//         setIsLoading(false);
//         console.log("la llave es: ", accessToken);
//         console.log("Respuesta del servidor:", response.data);
//         console.log("verificamos authState:", authState);
//         console.log("otra vez verificamos authState.status:", authState.status);
        
//       })
//       .catch((error) => {
//         console.error('Error al verificar si el usuario tiene un CV:', error);
//         setIsLoading(false);
//       });
//   }, [authState.id, authState]); // Agrega authState aquí

//   // Verifica si el usuario recién se ha registrado y aún no tiene un currículum
//   const isNewUser = authState.status === 'registered' && !hasCV;
//   console.log("nuevo usuario:", isNewUser); // Agrega este console.log
//   console.log("authState:", authState);
//   console.log("hasCV:", hasCV);
//   const verificarResgistroUsuario = authState.status === 'registered'
//   console.log("el registro de usuario es: ",verificarResgistroUsuario)
//   if (authState.status === true) {
//     // El usuario está autenticado, puedes mostrar contenido protegido aquí
//     console.log("el usuarioa esta autenticado")
//   } else {
//     // El usuario no está autenticado, puedes mostrar un mensaje de no autenticado o redirigirlo al inicio de sesión
//     console.log("el usuario no esta autenticado")
//   }
  
//   if (isLoading) {
//     return (
//       <div>
//         <h1 className="text-center">Loading...</h1>
//       </div>
//     );
//   }

//   console.log("Mostrar botón de Crear Curriculum:", isNewUser); // Agrega este console.log

//   return (
//     <div className="createApplicantPage">
//       <Link to={`/cv-form/${authState.id}`}>
//            <button className="createCvButton">Crear Curriculum</button>
//       </Link>
//       <Link to={`/cv-edit-form/${authState.id}`}>
//          <button className="editCvButton">Editar Curriculum</button>
//       </Link>
//     </div>
//   );
// }

// export default CVRegistration;



import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../helpers/newAuthContext';
import axios from 'axios';

const CVRegistration = () => {
  const { authState } = useContext(AuthContext);
  const [hasCV, setHasCV] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Obtén el token de acceso del almacenamiento local (localStorage)
    const accessToken = localStorage.getItem('accessToken');

    // Configura la solicitud HTTP con el token de acceso
    axios.get(`http://localhost:3000/applicant/user-with-cv`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      
      .then((response) => {
        setHasCV(!!response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error al verificar si el usuario tiene un CV:', error);
        setIsLoading(false);
      });
  }, [authState.id, authState]);

  // Verifica si el usuario recién se ha registrado y aún no tiene un currículum
  // const isNewUser = authState.status === 'registered' && !hasCV;

  if (isLoading) {
    return (
      <div>
        <h1 className="text-center">Loading...</h1>
      </div>
    );
  }

  return (
    <div className="createApplicantPage">
      <Link to={`/cv-form/${authState.id}`}>
        <button className="btn btn-primary">Crear Curriculum</button>
      </Link>
      {hasCV && (
        <Link to={`/cv-edit-form/${authState.id}`}>
          <button className="btn btn-primary">Editar Curriculum</button>
        </Link>
      )}
    </div>
  );
}

export default CVRegistration;
