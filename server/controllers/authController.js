// authController.js
// const { Utente } = require("../models");
// const bcrypt = require("bcrypt");
// const { sign } = require("jsonwebtoken");

// exports.registerUser = async (req, res) => {
//   const { username, password, role } = req.body;
//   try {
//     const hashedPassword = await bcrypt.hash(password, 10);
//     await Utente.create({
//       username: username,
//       password: hashedPassword,
//       role: role || "user",
//       status: 'registered', // Asegúrate de establecer status en 'registered'
//     });
//     res.json("SUCCESS");
//   } catch (error) {
//     res.status(500).json({ error: " registro fallido desde el servidor" });
//   }
// };

// authController.js
const { Utente } = require("../models");
const bcrypt = require("bcrypt");
const { sign } = require("jsonwebtoken");

exports.registerUser = async (req, res) => {
  const { username, password, role, email, dateBorn, rut } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    await Utente.create({
      username: username,
      password: hashedPassword,
      role: role || "user",
      status: 'registered',
      email: email,
      dateBorn: dateBorn,
      rut: rut,
    });
    res.json("SUCCESS");
  } catch (error) {
    console.error("Error al registrar usuario:", error);
    res.status(500).json({ error: "Registro fallido desde el servidor" });
  }
};


// exports.loginUser = async (req, res) => {
//   const { username, password } = req.body;
//   try {
//     const user = await Utente.findOne({ where: { username: username } });
//     if (!user) {
//       return res.json({ error: "User Doesn't Exist" });
//     }

//     const match = await bcrypt.compare(password, user.password);
//     if (!match) {
//       return res.json({ error: "Wrong Username And Password Combination" });
//     }
//     console.log("User ID:", user.id); // Agrega este log
//     const accessToken = sign(
//       { username: user.username, id: user.id, role: user.role },
//       "importantsecret"
//     );
//     res.json({ token: accessToken, username: username, id: user.id, role: user.role });
//   } catch (error) {
//     res.status(500).json({ error: "Login failed" });
//   }
// };

exports.loginUser = async (req, res) => {
  const { username, password, email } = req.body; // Incluye el campo de email
  try {
    const user = await Utente.findOne({ where: { username: username } });
    if (!user) {
      return res.json({ error: "User Doesn't Exist" });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.json({ error: "Wrong Username And Password Combination" });
    }
    console.log("User ID:", user.id); // Agrega este log
    const accessToken = sign(
      { username: user.username, id: user.id, role: user.role },
      "importantsecret"
    );
    res.json({ token: accessToken, username: username, id: user.id, role: user.role, email: email }); // Incluye el campo de email en la respuesta
  } catch (error) {
    res.status(500).json({ error: "Login failed" });
  }
};



//obtener a un usuario
exports.getUserById = async (req, res) => {
  const { utenteId } = req.params;

  try {
    const user = await Utente.findByPk(utenteId);
    if (!user) {
      return res.status(404).json({ error: "User Not Found" });
    }

    console.log("User information:", user); // Agrega este log para verificar la información del usuario

    res.json({
      id: user.id,
      username: user.username,
      role: user.role,
      // Agrega más campos según sea necesario
    });
  } catch (error) {
    console.error("Error al obtener información del usuario", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
