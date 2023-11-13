// import React, { useState } from 'react';

// const UpdateRequestForm = ({ onUpdate, onRequest, onClose }) => {
//   const [updatedRequest, setUpdatedRequest] = useState(onRequest);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setUpdatedRequest({
//       ...updatedRequest,
//       [name]: value,
//     });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onUpdate(updatedRequest);
//   };

//   return (
//     <div>
//       <h3>Actualizar Solicitud de Reemplazo</h3>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label htmlFor="titulo">Título:</label>
//           <input
//             type="text"
//             id="titulo"
//             name="titulo"
//             value={updatedRequest.titulo}
//             onChange={handleChange}
//           />
//         </div>
//         <div>
//           <label htmlFor="descripcion">Descripción:</label>
//           <textarea
//             id="descripcion"
//             name="descripcion"
//             value={updatedRequest.descripcion}
//             onChange={handleChange}
//           />
//         </div>
//         {/* Agrega campos adicionales según tus necesidades */}
//         <div>
//           <button type="submit">Actualizar</button>
//           <button onClick={onClose}>Cancelar</button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default UpdateRequestForm;
