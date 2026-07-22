// src/components/RutaProtegida.jsx
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export const RutaProtegida = ({ rolesPermitidos }) => {
  const { usuario } = useAuth();

  // 1. Si no hay usuario logueado, redirigir al Login
  if (!usuario) {
    return <Navigate to="/login" replace />;
  }

  // 2. Si el rol del usuario no está dentro de los permitidos, redirigir a no autorizado o su home
  if (rolesPermitidos && !rolesPermitidos.includes(usuario.rol)) {
    return <Navigate to="/unauthorized" replace />;
  }

  // 3. Si todo está correcto, renderiza el componente secundario (Outlet)
  return <Outlet />;
};