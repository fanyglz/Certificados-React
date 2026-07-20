import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import Admin from "../pages/Admin";
import RegistrarPaciente from "../pages/RegistrarPaciente";
import RegistrarUsuario from "../pages/RegistrarUsuario";
import CrearCertificado from "../pages/CrearCertificado";
import ImprimirCertificados from "../pages/ImprimirCertificados";
import GestionUsuarios from "../pages/GestionUsuarios";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Login />} />

        <Route path="/admin" element={<Admin />} />

      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;