// const { verify } = require("jsonwebtoken");

// const validateToken = (req, res, next) => {
//   const accessToken = req.header("accessToken");

//   if (!accessToken) return res.json({ error: "User not logged in!" });

//   try {
//     const validToken = verify(accessToken, "importantsecret");
//     req.user = validToken;

//     // Verificar el rol del usuario (por ejemplo, si se requiere un rol "admin" para acceder)
//     if (req.user.role !== "admin") {
//       return res.json({ error: "Access denied. You are not an admin." });
//     }
//     // Si el usuario tiene el rol adecuado, continúa
//     return next();
//   } catch (err) {
//     return res.json({ error: err });
//   }
// };

// module.exports = { validateToken };
// /////////////////////////////////////////////////////////////////////
const { verify } = require("jsonwebtoken");

const validateToken = (req, res, next) => {
  const accessToken = req.header("accessToken");
  // console.log("Token de acceso no encontrado en el encabezado.");
  if (!accessToken) return res.json({ error: "User not logged in! desde el servidor" });

  try {
    const validToken = verify(accessToken, "importantsecret");
    req.user = validToken;
    next();
  } catch (err) {
    console.error("Error al verificar el token:", err);
    return res.json({ error: "Invalid token" });
  }
};

module.exports = { validateToken };

// ///////////////////////////////////////////////////////////////////
//con la verificacoin de abajo dejas todo libre para acceder a distintas rutas y ya no obtienes el error user not logged in
// const { verify } = require("jsonwebtoken");

// const validateToken = (req, res, next) => {
//   const accessToken = req.header("accessToken");

//   // Verifica si se proporcionó un token de acceso, si no, continúa sin autenticación
//   if (!accessToken) return next();

//   try {
//     const validToken = verify(accessToken, "importantsecret");
//     req.user = validToken;
//     return next();
//   } catch (err) {
//     return res.json({ error: "Invalid token" });
//   }
// };

// module.exports = { validateToken };
