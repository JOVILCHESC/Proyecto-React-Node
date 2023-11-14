// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useParams } from 'react-router-dom';  // Importa useParams

// const PonderationList = () => {
//   const { requestId, utenteId} = useParams();  // Usa useParams para obtener los parámetros de la URL  
//     const [usuariosPonderados, setUsuariosPonderados] = useState([]);
  
//     useEffect(() => {
//       // PonderationList.js
// // ... (resto del código)

// const obtenerListaUsuariosPonderados = async () => {
//   try {
//     const response = await axios.get(`http://localhost:3000/postulate/obtenerUsuariosPonderados/${requestId}`);
//     console.log('response.data:', response.data);

//     const utenteIds = response.data.map(item => item.utenteId);

//     const usuariosDetallados = await Promise.all(
//       utenteIds.map(async (utenteId) => {
//         const usuarioResponse = await axios.get(`http://localhost:3000/auth/usuario/${utenteId}`);
//         return usuarioResponse.data;
//       })
//     );

//     const usuariosPonderadosConDetalles = response.data.map((item, index) => ({
//       ...item,
//       usuarioDetallado: usuariosDetallados[index],
//     }));

//     setUsuariosPonderados(usuariosPonderadosConDetalles);
//   } catch (error) {
//     console.error('Error al obtener la lista de usuarios ponderados', error);
//   }
// };
//       obtenerListaUsuariosPonderados();
// }, [requestId, utenteId]);

//   return (
//     <div>
//       <h1>Lista de Usuarios Ponderados</h1>
//       <table>
//         <thead>
//           <tr>
//             <th>Nombre Usuario</th>
//             <th>Puntaje Ponderado</th>
//             {/* Agrega más encabezados según sea necesario */}
//           </tr>
//         </thead>
//         <tbody>
//         {usuariosPonderados.map((usuario) => (
//   <tr key={usuario.id}>
//     <td>
//       {usuario.usuarioDetallado && usuario.usuarioDetallado.username
//         ? usuario.usuarioDetallado.username
//         : 'Nombre no disponible'}
//     </td>
//     <td>{usuario.ponderacion}</td>
//     {/* Agrega más celdas según sea necesario */}
//   </tr>
// ))}





//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default PonderationList;


import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Table, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const PonderationList = () => {
  const { requestId, utenteId } = useParams();
  const [usuariosPonderados, setUsuariosPonderados] = useState([]);

  useEffect(() => {
    const obtenerListaUsuariosPonderados = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/postulate/obtenerUsuariosPonderados/${requestId}`);
        console.log('response.data:', response.data);

        const utenteIds = response.data.map(item => item.utenteId);

        const usuariosDetallados = await Promise.all(
          utenteIds.map(async (utenteId) => {
            const usuarioResponse = await axios.get(`http://localhost:3000/auth/usuario/${utenteId}`);
            return usuarioResponse.data;
          })
        );

        const usuariosPonderadosConDetalles = response.data.map((item, index) => ({
          ...item,
          usuarioDetallado: usuariosDetallados[index],
        }));

        setUsuariosPonderados(usuariosPonderadosConDetalles);
      } catch (error) {
        console.error('Error al obtener la lista de usuarios ponderados', error);
      }
    };

    obtenerListaUsuariosPonderados();
  }, [requestId, utenteId]);

  return (
    <Container>
      <h1 className="mt-4">Lista de Usuarios Ponderados</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Nombre Usuario</th>
            <th>Puntaje Ponderado</th>
            {/* Agrega más encabezados según sea necesario */}
          </tr>
        </thead>
        <tbody>
          {usuariosPonderados.map((usuario) => (
            <tr key={usuario.id}>
              <td>
                {usuario.usuarioDetallado && usuario.usuarioDetallado.username
                  ? usuario.usuarioDetallado.username
                  : 'Nombre no disponible'}
              </td>
              <td>{usuario.ponderacion}</td>
              {/* Agrega más celdas según sea necesario */}
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default PonderationList;
