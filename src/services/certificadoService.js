import axios from "axios";

const API = "http://localhost/Certificados/Backend/php/Funciones";



export const obtenerPaciente = (idp) => {
  const formData = new FormData();
  formData.append("idp", idp);

  return axios.post(`${API}/buscarpacienteid.php`, formData);
};

export const crearCertificado = (datos) => {
  const formData = new FormData();
  formData.append("json", JSON.stringify(datos));

  return axios.post(`${API}/crearcert.php`, formData);
};

export const obtenerSelect = (tabla) => {
  const formData = new FormData();
  formData.append("nametable", tabla);

  return axios.post(`${API}/buscarselect.php`, formData);
};

export const obtenerCertificados = () => {
  // Como es un GET simple para traer todo, no necesitamos pasar FormData
  return axios.get(`${API}/listar_certificados.php`); 
};