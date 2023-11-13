// module.exports = (sequelize, DataTypes) => {
//     const Applicant = sequelize.define("Applicant", {
//       // Campos para la información de experiencia laboral.
//       jobTitle: {
//         type: DataTypes.STRING,
//         allowNull: false,
//       },
//       company: {
//         type: DataTypes.STRING,
//         allowNull: false,
//       },
//       startDate: {
//         type: DataTypes.DATE,
//         allowNull: false,
//       },
//       endDate: {
//         type: DataTypes.DATE,
//       },
//       // Otros campos para la descripción de tareas, logros, etc.
//       description: {
//         type: DataTypes.TEXT,
//       },
//       // Campos para habilidades y educación.
//       skills: {
//         type: DataTypes.TEXT,
//       },
//       education: {
//         type: DataTypes.TEXT,
//       },

//       // Asociación con el modelo de usuario.
//     });
  
//     // Asociación con el modelo de usuario (cada currículum pertenece a un usuario).
//     Applicant.associate = (models) => {
//       models.Applicant.belongsTo(models.User);
//     };
  
//     return Applicant;
//   };

//======================================================================
// module.exports = (sequelize, DataTypes) => {
//   const Applicant = sequelize.define("Applicant", {
//     // Campos para la información de experiencia laboral.
//     jobTitle: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     company: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     // Otros campos para la descripción de tareas, logros, etc.
//     description: {
//       type: DataTypes.TEXT,
//     },
    
//     education: {
//       type: DataTypes.TEXT,
//     },
//     // Campos puntuables.
//     yearsExperience: {
//       type: DataTypes.INTEGER, // Número de años totales de experiencia laboral.
//     },
//     languageSkills: {
//       type: DataTypes.STRING, // Nivel de competencia en idiomas.
//     },
//     certifications: {
//       type: DataTypes.TEXT, // Certificaciones relacionadas con habilidades.
//     },
//     technicalSkills: {
//       type: DataTypes.TEXT, // Habilidades técnicas (programación, diseño, etc.).
//     },
//     // Otros campos puntuables (agrega más según sea necesario).
//   });

//   // Asociación con el modelo de usuario.
//   Applicant.associate = (models) => {
//     models.Applicant.belongsTo(models.User);
//   };

//   return Applicant;
// };
//=========================================================


module.exports = (sequelize, DataTypes) => {
  const Applicant = sequelize.define("Applicant", {
    // Campos para la información de experiencia laboral.
    jobTitle: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    company: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // Otros campos para la descripción de tareas, logros, etc.
    description: {
      type: DataTypes.TEXT,
    },
    
    education: {
      type: DataTypes.TEXT,
    },
    // Campos puntuables.
    yearsExperience: {
      type: DataTypes.INTEGER, // Número de años totales de experiencia laboral.
    },
    languageSkills: {
      type: DataTypes.STRING, // Nivel de competencia en idiomas.
    },
    certifications: {
      type: DataTypes.TEXT, // Certificaciones relacionadas con habilidades.
    },
    technicalSkills: {
      type: DataTypes.TEXT, // Habilidades técnicas (programación, diseño, etc.).
    },
    cvFile: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    // Otros campos puntuables (agrega más según sea necesario).
  });

  // Asociación con el modelo RequestReplacement
  Applicant.associate = (models) => {
    // Asociación con RequestReplacement
    models.Applicant.belongsTo(models.RequestReplacement, {
      foreignKey: 'requestId', // El nombre de la columna en Applicant que hace referencia a RequestReplacement
    });

    // Asociación con Utente
    models.Applicant.belongsTo(models.Utente, {
      foreignKey: 'utenteId', // El nombre de la columna en Applicant que hace referencia a Utente
    });
    //soaciacion con postulation
    models.Applicant.hasMany(models.Postulation, {
      foreignKey: 'applicantId',
    });
  };
  return Applicant;
};
