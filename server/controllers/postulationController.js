const { Postulation, Applicant, RequestReplacement, Utente } = require('../models');

exports.postular = async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      throw new Error("Usuario no autenticado");
    }

    const utenteId = req.user.id;
    const requestId = req.params.requestId;
    const totalScoreTemp = 75;

    // Verificar si ya existe una postulación para el mismo usuario y solicitud
    const existingPostulation = await Postulation.findOne({
      where: {
        utenteId: utenteId,
        requestId: requestId,
      },
    });

    if (existingPostulation) {
      // Si ya existe una postulación, puedes manejarlo como desees
      return res.status(400).json({ error: 'Ya te has postulado a esta solicitud' });
    }

    // Obtén información del currículum (Applicant) asociado al usuario
    const applicant = await Applicant.findOne({
      where: {
        utenteId: utenteId,
      },
    });

    if (!applicant) {
      throw new Error("Currículum no encontrado para el usuario");
    }

    // Crea la postulación con la información del currículum
    const postulacion = await Postulation.create({
      utenteId,
      requestId,
      applicantId: applicant.id, // Agrega el id del currículum a la postulación
      totalScore: totalScoreTemp,
      // Puedes agregar más campos según sea necesario
    });

    res.status(201).json(postulacion);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al procesar la postulación' });
  }
};


// ///////////////////////////////////////////////////////
// //                   OBTENER LISTAS                       //
// //                                                   //
// //     -------------------------------               //
// exports.obtenerUsuariosPonderados = async (req, res) => {
//   try {
//     const requestId = req.params.requestId;

//     // Obtén la lista de postulantes y calcula la ponderación para cada uno
//     const postulantes = await Postulation.findAll({
//       where: {
//         requestId: requestId,
//       },
//       include: [
//         {
//           model: Applicant,
//           attributes: ['yearsExperience', 'education'], // Incluye los campos puntuables
//         },
//         {
//           model: RequestReplacement,
//           attributes: ['yearsExperience'], // Incluye el campo puntuable de la solicitud de reemplazo
//         },
//       ],
//     });

//     const postulantesConPonderacion = postulantes.map((postulante) => ({
//       ...postulante.toJSON(),
//       ponderacion: calcularPonderacion(postulante.Applicant, postulante.RequestReplacement),
//     }));

//     // Ordena la lista de postulantes por ponderación de mayor a menor
//     const postulantesOrdenados = postulantesConPonderacion.sort(
//       (a, b) => b.ponderacion - a.ponderacion
//     );

//     res.status(200).json(postulantesOrdenados);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Error al obtener la lista de usuarios ponderados' });
//   }
// };

// // Función para calcular la ponderación
// const calcularPonderacion = (applicant, requestReplacement) => {
//   let ponderacion = 0;

//   // Asigna valores a los campos puntuables según tus criterios
//   const educationScore = applicant ? getEducationScore(applicant.education) : 0;
//   const applicantExperience = applicant ? applicant.yearsExperience : 0;
//   const requestExperience = requestReplacement ? requestReplacement.yearsExperience : 0;
//   const experienceScore = getExperienceScore(applicantExperience, requestExperience);

//   // Puedes ajustar los pesos y la lógica según tus necesidades
//   ponderacion = educationScore * 0.5 + experienceScore * 0.5;

//   if (isNaN(ponderacion)) {
//     return 0;
//   }

//   return ponderacion;
// };


// const getEducationScore = (education) => {
//   // Asigna puntajes según niveles de educación
//   if (education === 'Media') {
//     return 3; // Puntaje para educación media
//   } else if (education === 'Universidad') {
//     return 5; // Puntaje para educación universitaria
//   } else if (education === 'Posgrado') {
//     return 10; // Puntaje para posgrado
//   } else {
//     return 0; // Otros casos
//   }
// };

// const getExperienceScore = (applicantExperience, requiredExperience) => {
//   // Asigna puntajes según la experiencia del solicitante en comparación con la requerida
//   if (applicantExperience >= requiredExperience) {
//     return 10; // Puntaje máximo si la experiencia del solicitante es igual o mayor que la requerida
//   } else {
//     // Puedes ajustar la lógica para asignar puntajes intermedios según tus criterios
//     return 5; // Puntaje intermedio si la experiencia del solicitante es menor que la requerida
//   }
// };

 

// OBTENER LISTAS
exports.obtenerUsuariosPonderados = async (req, res) => {
  try {
    const requestId = req.params.requestId;

    // Obtén la lista de postulantes y calcula la ponderación para cada uno
    const postulantes = await Postulation.findAll({
      where: {
        requestId: requestId,
      },
      include: [
        {
          model: Applicant,
          attributes: ['yearsExperience', 'education'],
        },
        {
          model: RequestReplacement,
          attributes: ['yearsExperience'],
        },
        {
          model: Utente, // Incluye el modelo Utente
          attributes: ['username'], // Agrega los campos que necesitas
        },
      ],
    });

    // Calcula la ponderación para cada postulante y actualiza la lista
    const postulacionesActualizadas = postulantes.map((postulante) => ({
      id: postulante.id,
      totalScore: postulante.totalScore, // Asegúrate de incluir otros campos necesarios
      ponderacion: calcularPonderacion(postulante.Applicant, postulante.RequestReplacement),
      usuarioDetallado: postulante.Utente, 
    }));

    // Actualiza todas las postulaciones en la base de datos
    await Postulation.bulkCreate(postulacionesActualizadas, {
      updateOnDuplicate: ['ponderacion'], // Actualiza solo el campo 'ponderacion'
    });

    // Obten la lista ordenada por ponderación de mayor a menor
    const postulantesOrdenados = postulantes.sort((a, b) => b.ponderacion - a.ponderacion);

    res.status(200).json(postulantesOrdenados);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener la lista de usuarios ponderados' });
  }
};

// Función para calcular la ponderación
const calcularPonderacion = (applicant, requestReplacement) => {
  let ponderacion = 0;

  if (!applicant || !requestReplacement) {
    // Maneja el caso en que Applicant o RequestReplacement es null
    console.error("Applicant o RequestReplacement es null");
    return ponderacion;
  }

  // Asigna valores a los campos puntuables según tus criterios
  const educationScore = getEducationScore(applicant.education);
  const applicantExperience = applicant.yearsExperience;
  const requestExperience = requestReplacement.yearsExperience;
  const experienceScore = getExperienceScore(applicantExperience, requestExperience);

  // Puedes ajustar los pesos y la lógica según tus necesidades
  ponderacion = educationScore * 0.5 + experienceScore * 0.5;

  if (isNaN(ponderacion)) {
    return 0;
  }

  return ponderacion;
};

// Función para asignar puntajes según niveles de educación
const getEducationScore = (education) => {
  if (education === 'Media') {
    return 3; // Puntaje para educación media
  } else if (education === 'Universidad') {
    return 5; // Puntaje para educación universitaria
  } else if (education === 'Posgrado') {
    return 10; // Puntaje para posgrado
  } else {
    return 0; // Otros casos
  }
};

// Función para asignar puntajes según la experiencia del solicitante en comparación con la requerida
const getExperienceScore = (applicantExperience, requiredExperience) => {
  if (applicantExperience >= requiredExperience) {
    return 10; // Puntaje máximo si la experiencia del solicitante es igual o mayor que la requerida
  } else {
    // Puedes ajustar la lógica para asignar puntajes intermedios según tus criterios
    return 5; // Puntaje intermedio si la experiencia del solicitante es menor que la requerida
  }
};
