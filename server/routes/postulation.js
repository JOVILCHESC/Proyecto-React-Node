const express = require('express');
const router = express.Router();
const postulationController = require('../controllers/postulationController');

const { validateToken } = require('../middlewares/passValidation');
// const { validateToken } = require('../middlewares/newAuthMiddleware');

// Ruta para postularse a una solicitud de reemplazo obtenerUsuariosPonderados
router.post('/solicitud/:requestId/postular', validateToken, postulationController.postular);

// Ruta para obtener la lista de usuarios ponderados
// router.get('/obtenerUsuariosPonderados/:requestId', postulationController.obtenerUsuariosPonderados);

// Ruta para obtener la lista de usuarios por solicitud
router.get('/solicitud/:requestId', postulationController.obtenerUsuariosPonderados);


module.exports = router;
