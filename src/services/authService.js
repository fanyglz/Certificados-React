import axios from "axios";

const API_URL = "http://localhost/certificados/Backend/php/Funciones/validarlogin.php";

export const login = async (correo, password) => {
    try {

        const response = await axios.post(
            API_URL,
            new URLSearchParams({
                json: JSON.stringify({
                    user: correo,
                    pass: password
                })
            })
        );

        return response.data;

    } catch (error) {

        console.error("Error en login:", error);

        return {
            Status: "Error",
            Message: "Error de conexión con el servidor"
        };
    }
};