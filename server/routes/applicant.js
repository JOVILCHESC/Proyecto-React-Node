const express = require("express");
const router = express.Router();
const applicantController = require("../controllers/applicantController");
// const validationMiddleware = require('../middlewares/validationMiddleware');
const {validateToken} = require('../middlewares/newAuthMiddleware');
// const { uploadPdf } = require('../controllers/applicantController');


// Ruta para registrar un nuevo solicitante/SUBIR NUEVO CURRICULUM(original)
// router.post("/", validateToken, uploadPdf, applicantController.createApplicant);
// ...
router.post("/", validateToken, applicantController.createApplicant);
//ruta para el edit
router.get('/applicant/edit', applicantController.getApplicantForEdit);
// Ruta para obtener un currículum por su ID (se requiere autenticación(mas especifico))
router.get("/obtainByID/:id", applicantController.getApplicantById);

// Ruta para obtener un solicitante por su ID/ ES PAR OBTENER UN CURRICULUM(original)
// router.get("/ByID/:id", applicantController.getApplicantById);


// Ruta para obtener todos los solicitantes
router.get("/", applicantController.getAllApplicants);

// Ruta para actualizar un currículum por su ID (se requiere autenticación)
router.put("/updateByID/:id", validateToken, applicantController.updateApplicantById);

// Ruta para eliminar un currículum por su ID (se requiere autenticación)
router.delete("/byID/:id", validateToken, applicantController.deleteApplicantById);


// Ruta para obtener información del usuario y su currículum
router.get("/user-with-cv", validateToken, applicantController.getUserWithCV);

module.exports = router;
