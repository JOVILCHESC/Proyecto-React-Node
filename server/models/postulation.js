module.exports = (sequelize, DataTypes) => {
    const Postulation = sequelize.define("Postulation", {
      // Puedes agregar campos adicionales según tus necesidades
      totalScore: {
        type: DataTypes.INTEGER, // Esto podría ser el puntaje de la postulación
        allowNull: true,
      },
      
      ponderacion: {
        type: DataTypes.FLOAT, // Ajusta el tipo de dato según tus necesidades
        allowNull: true,
      },
    });
    
  
    // Asociaciones con otros modelos
    Postulation.associate = (models) => {
      // Asociación con el modelo Utente (usuario)
      Postulation.belongsTo(models.Utente, {
        foreignKey: 'utenteId',
      });
  
      // Asociación con el modelo RequestReplacement (solicitud de reemplazo)
      Postulation.belongsTo(models.RequestReplacement, {
        foreignKey: 'requestId', // Asegúrate de que el nombre de la columna sea correcto
      });

      // Asociación con Applicant
      Postulation.belongsTo(models.Applicant, {
        foreignKey: 'applicantId',
      });
    };
  
    return Postulation;
  };
  