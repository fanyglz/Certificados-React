import axios from "axios";

// Apuntando al nombre exacto de tu archivo: validarlogin.php
const API_URL = "http://localhost/certificados/Backend/php/Funciones/validarlogin.php";

export const login = async (correo, password) => {
  try {
    // Enviamos el objeto en el formato que tu validarlogin.php espera leer
    const payload = JSON.stringify({
      user: correo,
      pass: password
    });

    const response = await axios.post(
      API_URL,
      payload,
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );

    return response.data;

  } catch (error) {
    console.error("Error en login:", error);

    return {
      Status: "Error",
      Message: "Error de conexión con el servidor. Verifica que Apache/XAMPP esté activo."
    };
  }
};