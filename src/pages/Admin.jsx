import { useState } from "react";
import "../styles/styleAdmin.css";

import RegistrarUsuario from "./RegistrarUsuario";
import RegistrarPaciente from "./RegistrarPaciente";
import GestionUsuarios from "./GestionUsuarios";
import CrearCertificado from "./CrearCertificado";
import ImprimirCertificados from "./ImprimirCertificados";

function Admin() {
  // Estado provisional para pruebas
  const [idPacienteSeleccionado, setIdPacienteSeleccionado] = useState(1); 

  return (
    <div style={{ width: "100%", padding: "10px", boxSizing: "border-box" }}>
      {/* 
        Módulo de Inicio / Bienvenido
      */}
      <div
        style={{
          background: "white",
          color: "#1E293B",
          padding: "24px",
          borderRadius: "12px",
          border: "1px solid #E2E8F0",
          boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)"
        }}
      >
        <h1 style={{ margin: 0, fontSize: "24px", color: "#D32F2F" }}>
          Panel de Administración
        </h1>
        <p style={{ marginTop: "8px", color: "#64748B" }}>
          Bienvenido al sistema CRM de Cruz Roja. Selecciona una opción del menú lateral para comenzar.
        </p>
      </div>
    </div>
  );
}

export default Admin;