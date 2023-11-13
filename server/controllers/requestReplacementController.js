const { RequestReplacement, Postulation, Applicant, Utente } = require("../models");

// Controlador para obtener todas las solicitudes de reemplazo
exports.getAllRequestReplacements = async (req, res) => {
  try {
    const requestReplacements = await RequestReplacement.findAll();
    res.json(requestReplacements);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener solicitudes de reemplazo" });
  }
};

// Controlador para obtener una solicitud de reemplazo por su Id
exports.getRequestReplacementById = async (req, res) => {
  const id = req.params.id;
  try {
    const request = await RequestReplacement.findByPk(id);
    if (!request) {
      return res.status(404).json({ error: "Solicitud de reemplazo no encontrado" });
    }
    res.json(request);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener solicitud de reemplazo por ID" });
  }
};

// Controlador para registrar una nueva solicitud de reemplazo
exports.createRequestReplacement = async (req, res) => {
  const requestReplacementData = req.body;

  try {
    // Crea una nueva solicitud de reemplazo en la base de datos
    const newRequestReplacement = await RequestReplacement.create(requestReplacementData);
    res.status(201).json(newRequestReplacement);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al registrar solicitud de reemplazo" });
  }
};

// Puedes agregar otros controladores relacionados con las solicitudes de reemplazo, como actualizar, eliminar, etc., según tus necesidades.
// controllers/deleteRequestReplacementController.js
// Controlador para eliminar una solicitud de reemplazo por su ID
exports.deleteRequestReplacementById = async (req, res) => {
  const id = req.params.id;
  try {
    const request = await RequestReplacement.findByPk(id);
    if (!request) {
      return res.status(404).json({ error: "Solicitud de reemplazo no encontrada" });
    }
    await request.destroy();
    res.json({ message: "Solicitud de reemplazo eliminada exitosamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al eliminar solicitud de reemplazo por ID" });
  }
};


// controllers/updateRequestReplacementController.js
// Controlador para actualizar una solicitud de reemplazo por su ID
exports.updateRequestReplacementById = async (req, res) => {
  const id = req.params.id;
  const updatedData = req.body; // Los nuevos datos que deben actualizarse

  try {
    const request = await RequestReplacement.findByPk(id);
    if (!request) {
      return res.status(404).json({ error: "Solicitud de reemplazo no encontrada" });
    }

    // Actualiza los campos necesarios
    await request.update(updatedData);

    res.json({ message: "Solicitud de reemplazo actualizada exitosamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al actualizar solicitud de reemplazo por ID" });
  }
};

// // requestReplacementController.js
// exports.obtenerPostulantesPorSolicitud = async (req, res) => {
//   try {
//     const requestId = req.params.requestId;

//     // Consulta para obtener los postulantes asociados a una solicitud de reemplazo específica
//     const postulantes = await Applicant.findAll({
//       include: [
//         {
//           model: Postulation,
//           where: {
//             requestId: requestId,
//           },
//           include: [
//             {
//               model: Utente,
//             },
//           ],
//         },
//       ],
//     });

//     res.json(postulantes);
//   } catch (error) {
//     console.error('Error al obtener los postulantes:', error);
//     res.status(500).json({ error: 'Error al obtener los postulantes' });
//   }
// };

exports.obtenerPostulantesPorSolicitud = async (req, res) => {
  try {
    const requestId = req.params.requestId;

    // Consulta para obtener los postulantes asociados a una solicitud de reemplazo específica
    const postulantes = await Applicant.findAll({
      include: [
        {
          model: Postulation,
          where: {
            requestId: requestId,
          },
          include: [
            {
              model: Utente,
            },
          ],
        },
        // Incluir también el modelo Applicant para obtener información del currículum
        {
          model: Utente,
        },
      ],
    });

    res.json(postulantes);
  } catch (error) {
    console.error('Error al obtener los postulantes:', error);
    res.status(500).json({ error: 'Error al obtener los postulantes' });
  }
};