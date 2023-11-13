// import { createContext } from "react";

// const initialAuthState = {
//   username: "",
//   id: 0,
//   status: "registered",
//   role: "", // Agregar el campo "role" al estado de autenticación
// };
import { createContext } from "react";
const initialAuthState = {
  username: "",
  id: 0,
  status: false,
  role: "", // Agregar el campo "role" al estado de autenticación
};
export const AuthContext = createContext(initialAuthState);

// export const AuthContext = createContext(initialAuthState);
// import { createContext } from "react";

// const initialAuthState = {
//   username: "",
//   id: 0,
//   status: "registered",
//   role: "",
//   utenteId: "", // Agregar utenteId al estado de autenticación
//   applicantId: "", // Agregar applicantId al estado de autenticación
// };

// export const AuthContext = createContext(initialAuthState);
