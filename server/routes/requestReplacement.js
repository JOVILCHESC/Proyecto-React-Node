// const express = require("express");
// const router = express.Router();
// const { RequestReplacement } = require("../models"); // Asegúrate de importar el modelo "RequestReplacement" adecuado

// // Ruta para obtener todas las solicitudes de reemplazo
// router.get("/", async (req, res) => {
//   try {
//     const requestReplacements = await RequestReplacement.findAll();
//     res.json(requestReplacements);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Error al obtener solicitudes de reemplazo" });
//   }
// });

// // Ruta para registrar una nueva solicitud de reemplazo
// router.post("/", async (req, res) => {
//   const requestReplacementData = req.body;

//   try {
//     // Crea una nueva solicitud de reemplazo en la base de datos
//     const newRequestReplacement = await RequestReplacement.create(requestReplacementData);
//     res.status(201).json(newRequestReplacement);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Error al registrar solicitud de reemplazo" });
//   }
// });

// // Otras rutas relacionadas con las solicitudes de reemplazo, como actualización, eliminación, etc., se pueden agregar aquí.

// module.exports = router;


const express = require("express");
const router = express.Router();
const requestReplacementController = require("../controllers/requestReplacementController");

// Ruta para obtener todas las solicitudes de reemplazo
router.get("/", requestReplacementController.getAllRequestReplacements);

// Ruta para obtener una solicitud de reemplazo por su ID
router.get("/ByID/:id", requestReplacementController.getRequestReplacementById);

// Ruta para registrar una nueva solicitud de reemplazo
router.post("/", requestReplacementController.createRequestReplacement);

// Puedes agregar otras rutas relacionadas con las solicitudes de reemplazo, como actualizar, eliminar, etc., según tus necesidades.
// Nueva ruta para eliminar una solicitud de reemplazo por su ID
router.delete("/:id", requestReplacementController.deleteRequestReplacementById);

// Nueva ruta para actualizar una solicitud de reemplazo por su ID
router.put("/:id", requestReplacementController.updateRequestReplacementById);
//obtener postulantes asociados a la solicitud de reemplazo
router.get('/postulantes/:requestId', requestReplacementController.obtenerPostulantesPorSolicitud);

module.exports = router;
