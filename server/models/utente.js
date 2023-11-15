module.exports = (sequelize, DataTypes) => {
    const Utente = sequelize.define("Utente", {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      role: {
        type: DataTypes.STRING,
        defaultValue: "utente", // Valor predeterminado como "user"
      },
      status: {
        type: DataTypes.STRING, // O el tipo de datos adecuado para tu caso
        defaultValue: "registered",
      },
      email: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      dateBorn: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      rut: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true,
      },
    });
  
    return Utente;
  };
  

// module.exports = (sequelize, DataTypes) => {
//   const Utente = sequelize.define("Utente", {
//     username: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     password: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     email: {
//       type: DataTypes.STRING,
//       allowNull: true,
//       unique: true,
//       validate: {
//         isEmail: true,
//       },
//     },
//     dateBorn: {
//       type: DataTypes.DATE,
//       allowNull: true,
//     },
//     rut: {
//       type: DataTypes.STRING,
//       allowNull: true,
//       unique: true,
//     },
//     role: {
//       type: DataTypes.STRING,
//       defaultValue: "utente",
//     },
//     status: {
//       type: DataTypes.STRING,
//       defaultValue: "registered",
//     },
//   });

//   return Utente;
// };
