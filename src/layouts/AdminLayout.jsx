import { Outlet, Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/styleAdmin.css";

export default function AdminLayout() {
  const { usuario, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/", { replace: true });
  };

  return (
    <div className="dashboard-container">
      {/* BARRA LATERAL */}
      <aside className="sidebar">
        <div>
          <div className="sidebar-header">
            <img 
              src="/certificados/Images/Emblemahorizontal.png" 
              alt="Cruz Roja" 
              className="sidebar-logo" 
            />
            <h3>Panel Admin</h3>
          </div>

          <nav>
            <ul className="menu-list">
              <li>
                <Link to="/admin" className="nav-link active">
                  <span className="icon">🏠</span> Inicio
                </Link>
              </li>
              <li>
                <Link to="/admin/registrar-usuario" className="nav-link">
                  <span className="icon">👤</span> Registrar Usuario
                </Link>
              </li>
              <li>
                <Link to="/admin/gestion-usuarios" className="nav-link">
                  <span className="icon">⚙️</span> Gestión Usuarios
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        <div style={{ padding: "16px" }}>
          {usuario?.nombre && (
            <div style={{ fontSize: "12px", color: "var(--text-secondary)", marginBottom: "10px" }}>
              Hola, <strong>{usuario.nombre}</strong>
            </div>
          )}
          <button onClick={handleLogout} className="btn-primary" style={{ width: "100%", backgroundColor: "var(--primary-red)" }}>
            🚪 Cerrar Sesión
          </button>
        </div>
      </aside>

      {/* ÁREA PRINCIPAL */}
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
}