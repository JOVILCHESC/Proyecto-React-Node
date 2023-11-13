// const express = require("express");
// const router = express.Router();
// const { Utente } = require("../models");
// const bcrypt = require("bcrypt");
// const { validateToken } = require("../middlewares/newAuthMiddleware");
// const { sign } = require("jsonwebtoken");

// router.post("/", async (req, res) => {
//     const { username, password, role } = req.body;
//     bcrypt.hash(password, 10).then((hash) => {
//       Utente.create({
//         username: username,
//         password: hash,
//         role: role || "user", // Establece el valor predeterminado como "user"
//       });
//       res.json("SUCCESS");
//     });
//   });
  

//   router.post("/login", async (req, res) => {
//     const { username, password } = req.body;
  
//     const user = await Utente.findOne({ where: { username: username } });
  
//     if (!user) {
//       res.json({ error: "User Doesn't Exist" });
//     } else {
//       bcrypt.compare(password, user.password).then(async (match) => {
//         if (!match) {
//           res.json({ error: "Wrong Username And Password Combination" });
//         } else {
//           const accessToken = sign(
//             { username: user.username, id: user.id, role: user.role }, // Incluye el rol
//             "importantsecret"
//           );
//           res.json({ token: accessToken, username: username, id: user.id });
//         }
//       });
//     }
//   });
  

// router.get("/auth", validateToken, (req, res) => {
//   res.json(req.user);
// });

// module.exports = router;

const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const { validateToken } = require("../middlewares/newAuthMiddleware");

router.post("/register", authController.registerUser);
router.post("/login", authController.loginUser);
router.get("/usuario/:utenteId", authController.getUserById);
router.get("/auth", validateToken, (req, res) => {
  res.json(req.user);
});


module.exports = router;
