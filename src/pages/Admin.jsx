import { useState } from "react";
import Sidebar from "../components/Sidebar";
import TopBar from "../components/TopBar";
import RegistrarUsuario from "../components/RegistrarUsuario";
import "../styles/styleAdmin.css";
import RegistrarPaciente from "../components/RegistrarPaciente";
import GestionUsuarios from "../components/GestionUsuarios";
import CrearCertificado from "../components/CrearCertificado"; 
import ImprimirCertificados from "../components/ImprimirCertificados";

function Admin() {
  const [vista, setVista] = useState("inicio");
  
  // Guardamos temporalmente un ID de paciente para las pruebas del módulo 1 y 2
  const [idPacienteSeleccionado, setIdPacienteSeleccionado] = useState(1); 

  return (
    <div className="dashboard-container">
      <Sidebar setVista={setVista} />

      <div className="main-content">
        {/* <TopBar /> */}

        {vista === "inicio" && (
          <div
            style={{
              background: "white",
              color: "black",
              padding: "20px",
              border: "2px solid red"
            }}
          >
            <h1>Panel de Administración</h1>
            <p>Si ves este cuadro, el problema es el CSS.</p>
          </div>
        )}

        {vista === "usuarios" && <RegistrarUsuario />}

        {vista === "gestionar" && <GestionUsuarios />}

        {/* 2. RENDERIZAMOS TU COMPONENTE PASÁNDOLE EL ID */}
        {vista === "certificados" && (
          <div className="bg-white p-3 rounded text-dark"> 
            <CrearCertificado idPaciente={idPacienteSeleccionado} />
          </div>
        )}

        {/* Busca donde tenías vista === "imprimir" y cámbialo por esto */}
        {vista === "imprimir" && (
          <div className="bg-white p-3 rounded text-dark">
          <ImprimirCertificados />
          </div>
)}
      </div>
    </div>
  );
}

export default Admin;