import { useState, useRef } from "react";
import { registrarUsuario } from "../services/userService";

function RegistrarUsuario() {
  const [nombre, setNombre] = useState("");
  const [apellidoP, setApellidoP] = useState("");
  const [apellidoM, setApellidoM] = useState("");
  const [correo, setCorreo] = useState("");
  const [tipoUsuario, setTipoUsuario] = useState("1");
  const [sexo, setSexo] = useState("MASCULINO");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [cedula, setCedula] = useState("");
  const [especialidad, setEspecialidad] = useState("");

  const canvasRef = useRef(null);

  const handleRegistrar = async () => {
    if (password !== confirmPassword) {
      alert("Las contraseñas no coinciden");
      return;
    }

    const datos = {
      rol: tipoUsuario,
      app: apellidoP.toUpperCase(),
      amp: apellidoM.toUpperCase(),
      nom: nombre.toUpperCase(),
      sexu: sexo,
      corr: correo,
      pass: password,
    };

    if (tipoUsuario === "1") {
      datos.ced = cedula;
      datos.esp = especialidad;

      const firma = canvasRef.current.toDataURL("image/png");

      datos.img = firma;

      console.log("Firma:", firma);
    }

    console.log("Enviando:", datos);

    const response = await registrarUsuario(datos);

    console.log("Tipo:", typeof response);
    console.log(response);

    alert(response.Message);
  };

    <select
        value={especialidad}
        onChange={(e) => setEspecialidad(e.target.value)}
>
        <option value="">Seleccione especialidad</option>
        <option value="1">Cardiología</option>
        <option value="2">Dermatología</option>
        <option value="3">Gastroenterología</option>
        <option value="4">Medicina Interna</option>
        <option value="5">Medico General</option>
    </select>

  return (
    <div>
      <h3>Registrar Nuevo Usuario</h3>

      <input
        type="text"
        placeholder="Nombre"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
      />

      <br /><br />

      <input
        type="text"
        placeholder="Apellido Paterno"
        value={apellidoP}
        onChange={(e) => setApellidoP(e.target.value)}
      />

      <br /><br />

      <input
        type="text"
        placeholder="Apellido Materno"
        value={apellidoM}
        onChange={(e) => setApellidoM(e.target.value)}
      />

      <br /><br />

      <input
        type="email"
        placeholder="Correo"
        value={correo}
        onChange={(e) => setCorreo(e.target.value)}
      />

      <br /><br />

      <select
        value={tipoUsuario}
        onChange={(e) => setTipoUsuario(e.target.value)}
      >
        <option value="1">MÉDICO</option>
        <option value="3">RECEPCIONISTA</option>
      </select>

      <br /><br />

      <select
        value={sexo}
        onChange={(e) => setSexo(e.target.value)}
      >
        <option value="MASCULINO">MASCULINO</option>
        <option value="FEMENINO">FEMENINO</option>
      </select>

      <br /><br />

      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <br /><br />

      <input
        type="password"
        placeholder="Confirmar contraseña"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />

      {tipoUsuario === "1" && (
        <>
          <br /><br />

          <input
            type="text"
            placeholder="Cédula Profesional"
            value={cedula}
            onChange={(e) => setCedula(e.target.value)}
          />

          <br /><br />

          <input
            type="text"
            placeholder="Especialidad"
            value={especialidad}
            onChange={(e) => setEspecialidad(e.target.value)}
          />

          <br /><br />

          <h4>Firma</h4>

          <canvas
            ref={canvasRef}
            width="400"
            height="150"
            style={{
              border: "1px solid black",
            }}
          />

          <br /><br />
        </>
      )}

      <button onClick={handleRegistrar}>
        Registrar Usuario
      </button>
    </div>
  );
}

export default RegistrarUsuario;