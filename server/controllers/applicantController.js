const { Applicant } = require("../models");

exports.createApplicant = async (req, res) => {
  const userId = req.user.id;
  const applicantData = req.body;

  try {
    // Verificar si el usuario ya tiene un currículum
    const existingApplicant = await Applicant.findOne({ where: { utenteId: userId } });

    if (existingApplicant) {
      // El usuario ya tiene un currículum, actualízalo en lugar de crear uno nuevo
      await existingApplicant.update(applicantData);
      return res.status(200).json(existingApplicant);
    }

    // Si el usuario no tiene un currículum, crea uno
    const newApplicant = await Applicant.create({ ...applicantData, utenteId: userId });
    res.status(201).json(newApplicant);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al registrar currículum" });
  }
};


exports.getApplicantForEdit = async (req, res) => {
  const userId = req.user.id;

  try {
    // Obtener el currículum del usuario
    const existingApplicant = await Applicant.findOne({ where: { utenteId: userId } });

    if (existingApplicant) {
      // Devolver los datos del currículum para la edición
      return res.status(200).json(existingApplicant);
    }

    // Si el usuario no tiene un currículum, puedes manejarlo según tus necesidades
    res.status(404).json({ error: "Currículum no encontrado" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener currículum para editar" });
  }
};


// Controlador para obtener todos los solicitantes
exports.getAllApplicants = async (req, res) => {
  try {
    const applicants = await Applicant.findAll();
    res.json(applicants);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener solicitantes" });
  }
};


//obtene por id
exports.getApplicantById = async (req, res) => {
  const id = req.params.id;

  try {
    const applicant = await Applicant.findByPk(id);
    if (!applicant) {
      return res.status(404).json({ error: "Currículum no encontrado" });
    }

    res.json(applicant);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener currículum por ID" });
  }
}

//Actualizar por id
exports.updateApplicantById = async (req, res) => {
  const id = req.params.id;
  const updatedData = req.body;

  try {
    const applicant = await Applicant.findByPk(id);
    if (!applicant) {
      return res.status(404).json({ error: "Currículum no encontrado" });
    }

    await applicant.update(updatedData);
    res.json(applicant);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al actualizar currículum por ID" });
  }
}


// Controlador para eliminar un currículum por su ID
exports.deleteApplicantById = async (req, res) => {
  const id = req.params.id;

  try {
    // Valida el token de autenticación
    const token = req.headers.authorization;
    const userId = req.utente.id; // Asegúrate de que esta sea la forma correcta de obtener el ID del usuario

    const applicant = await Applicant.findByPk(id);
    if (!applicant) {
      return res.status(404).json({ error: "Currículum no encontrado" });
    }

    // Verifica que el usuario actual sea el propietario del currículum
    if (applicant.utenteId !== userId) {
      return res.status(403).json({ error: "Acceso no autorizado" });
    }

    await applicant.destroy();
    res.json({ message: "Currículum eliminado con éxito" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al eliminar currículum por ID" });
  }
}


// controllers/userController.js

exports.getUserWithCV = async (req, res) => {
  const userId = req.user.id; // O la forma en que identificas al usuario

  try {
    // Consulta el usuario
    const user = await Utente.findOne({ where: { id: userId } });

    // Consulta el currículum (Applicant) asociado al usuario
    const curriculum = await Applicant.findOne({ where: { utenteId: userId } });

    // Define un objeto que incluye el estado del usuario y los detalles del currículum.
    const response = {
      username: user.username,
      id: user.id,
      status: user.status,
      hasCV: !!curriculum, // Indicador de si tiene un currículum
      // curriculum: curriculum, // O puedes incluir más detalles aquí
    };

    if (curriculum) {
      // El usuario tiene un currículum
      console.log("Tienes un currículum asociado a tu cuenta:", curriculum);
    } else {
      // El usuario no tiene un currículum
      console.log("No tienes un currículum asociado a tu cuenta");
    }
    

    res.json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener información de usuario y currículum" });
  }
}
