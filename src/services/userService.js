import axios from "axios";

export const registrarUsuario = async (datos) => {

  try {

    const response = await axios.post(
      "http://localhost/certificados/Backend/php/Funciones/createuser.php",
      datos,
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    );

    return response.data;

  } catch (error) {

    console.error("Error:", error);

    return {
      Status: "Error",
      Message: "Error de conexión"
    };
  }
};