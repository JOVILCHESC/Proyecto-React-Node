const express = require("express");
const app = express();
const cors = require('cors');
const multer = require('multer');
// const session = require("express-session");


//la linea de abajo solo sirve para poder utilizar insomnia y que devuelva los valores en formato json
//y que tambien los introduzca en la tabla

app.use(cors());
app.use(express.json());
// Configura el almacenamiento de Multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Define el directorio donde se almacenarán los archivos
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    // Define el nombre del archivo
    cb(null, file.fieldname + '-' + Date.now() + '.pdf');
  },
});

// Crea la instancia de Multer con la configuración
const upload = multer({ storage: storage });

const db = require("./models");

// //Routers
// const postRouter = require("./routes/users");
// app.use("/users", postRouter);

const applicantRouter = require("./routes/applicant");
app.use("/applicant", upload.single('cvFile'), applicantRouter);

const utenteRouter = require("./routes/utente");
app.use("/auth", utenteRouter);

const replacementRouter = require("./routes/requestReplacement");
app.use("/requestReplacement", replacementRouter);

const punctuationRouter = require("./routes/punctuation");
app.use("/punctuation", punctuationRouter);

const calculateAllScoresRouter = require("./routes/calculateAllScoresController");
app.use("/calculate-scores", calculateAllScoresRouter);

const postulationRouter = require("./routes/postulation");
app.use("/postulate", postulationRouter);


db.sequelize.sync().then(() => {
  app.listen(3000, () => {
    console.log("Server running on port 3000");
  });
});

//=======================================================
