import { BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { ROLES } from "../constants/roles";

// Importación de Páginas
import Login from "../pages/Login";
import Admin from "../pages/Admin";
import RegistrarPaciente from "../pages/RegistrarPaciente";
import RegistrarUsuario from "../pages/RegistrarUsuario";
import CrearCertificado from "../pages/CrearCertificado";
import ImprimirCertificados from "../pages/ImprimirCertificados";
import GestionUsuarios from "../pages/GestionUsuarios";

// 🔴 IMPORTACIÓN CORRECTA DESDE LA CARPETA LAYOUTS
import AdminLayout from "../layouts/AdminLayout";
import MedicoLayout from "../layouts/MedicoLayout";

// Componente para proteger las rutas
const RutaProtegida = ({ rolesPermitidos }) => {
  const { usuario } = useAuth();

  if (!usuario || usuario.rol === undefined || usuario.rol === null) {
    return <Navigate to="/" replace />;
  }

  const rolActual = String(usuario.rol).trim();
  const rolesValidos = rolesPermitidos.map(r => String(r).trim());

  if (!rolesValidos.includes(rolActual)) {
    if (rolActual === "1") {
      return <Navigate to="/medico/crear-certificado" replace />;
    }
    return <Navigate to="/admin" replace />;
  }

  return <Outlet />;
};

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Ruta pública */}
        <Route path="/" element={<Login />} />

        {/* 🔴 RUTAS DE ADMINISTRADOR (Roles 0 y 3) -> Usa AdminLayout */}
        <Route element={<RutaProtegida rolesPermitidos={["0", "3", ROLES.ADMIN_SUPER, ROLES.ADMIN]} />}>
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Admin />} />
            <Route path="registrar-usuario" element={<RegistrarUsuario />} />
            <Route path="gestion-usuarios" element={<GestionUsuarios />} />
          </Route>
        </Route>

        {/* 🔵 RUTAS DE MÉDICO (Rol 1) -> Usa MedicoLayout */}
        <Route element={<RutaProtegida rolesPermitidos={["1", ROLES.MEDICO]} />}>
          <Route path="/medico" element={<MedicoLayout />}>
            <Route path="crear-certificado" element={<CrearCertificado />} />
            <Route path="registrar-paciente" element={<RegistrarPaciente />} />
            <Route path="imprimir-certificados" element={<ImprimirCertificados />} />
          </Route>
        </Route>

        {/* Redirección global */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;