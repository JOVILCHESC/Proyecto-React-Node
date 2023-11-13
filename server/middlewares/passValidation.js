const { verify } = require('jsonwebtoken');


const validateToken = (req, res, next) => {
  const accessToken = req.header("accessToken");
  console.log("Token recibido:", accessToken); // Agrega este log
  if (!accessToken) {
    return next();
  }

  try {
    const validToken = verify(accessToken, "importantsecret");
    if (!validToken) {
      throw new Error("Invalid token");
    }

    console.log("Usuario autenticado:", validToken);
    req.user = validToken;
    next();
  } catch (err) {
    console.error("Error al verificar el token:", err);
    return res.json({ error: "Invalid token" });
  }
};


module.exports = { validateToken };
