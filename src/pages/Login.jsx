import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/authService";

function Login() {
const navigate = useNavigate();

  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  

  const handleLogin = async () => {

    const response = await login(usuario, password);

      console.log(response);
      alert(JSON.stringify(response));

    if (response.Status === "Success") {

      localStorage.setItem(
        "usuario",
        JSON.stringify(response.Data)
    );
    
        console.log("Rol:", response.Data.rol);
        
      alert("Voy a navegar");

      navigate("/admin");

      alert("Ya navegué");
      

      console.log("Datos usuario:", response.Data);

      // Aquí después pondremos la navegación al panel principal

    } else {

      alert(response.Message);

    }

  };


  return (
    <div>

      <h1>
        Login Sistema Certificados Médicos
      </h1>


      <input 
        type="text"
        placeholder="Usuario"
        value={usuario}
        onChange={(e) => setUsuario(e.target.value)}
      />


      <br />


      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />


      <br />


      <button onClick={handleLogin}>
        Ingresar
      </button>


    </div>
  );
}

export default Login;
