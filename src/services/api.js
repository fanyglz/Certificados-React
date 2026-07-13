import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost/certificados/Backend/php/Funciones/",
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
  },
});

export default api;