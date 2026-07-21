import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import Admin from "../pages/Admin";
import RegistrarPaciente from "../pages/RegistrarPaciente";
import RegistrarUsuario from "../pages/RegistrarUsuario";
import CrearCertificado from "../pages/CrearCertificado";
import ImprimirCertificados from "../pages/ImprimirCertificados";
import GestionUsuarios from "../pages/GestionUsuarios";
import AdminLayout from "../components/AdminLayout"; // Importa el Layout

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Ruta pública sin menú */}
        <Route path="/" element={<Login />} />

        {/* Rutas administrativas protegidas con el mismo Layout y Menú */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Admin />} />
          <Route path="registrar-paciente" element={<RegistrarPaciente />} />
          <Route path="registrar-usuario" element={<RegistrarUsuario />} />
          <Route path="crear-certificado" element={<CrearCertificado />} />
          <Route path="imprimir-certificados" element={<ImprimirCertificados />} />
          <Route path="gestion-usuarios" element={<GestionUsuarios />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;