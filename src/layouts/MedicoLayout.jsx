import { Outlet, Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function MedicoLayout() {
  const { usuario, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/", { replace: true });
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh", fontFamily: '"Segoe UI", Roboto, sans-serif' }}>
      
      {/* SIDEBAR DE MÉDICO */}
      <aside style={{ 
        width: "260px", 
        backgroundColor: "#0F172A", 
        color: "#FFFFFF", 
        padding: "25px 20px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        boxShadow: "4px 0 10px rgba(0,0,0,0.1)"
      }}>
        <div>
          {/* ENCABEZADO */}
          <div style={{ borderBottom: "1px solid #334155", paddingBottom: "15px", marginBottom: "20px" }}>
            <h3 style={{ margin: 0, fontSize: "18px", color: "#F8FAFC", fontWeight: "700" }}>
              Panel Médico
            </h3>
            <span style={{ fontSize: "12px", color: "#94A3B8" }}>
              Cruz Roja Mexicana
            </span>
          </div>

          {/* MENÚ MÉDICO */}
          <nav>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              <li style={{ marginBottom: "12px" }}>
                <Link to="/medico/crear-certificado" style={linkStyle}>
                  📝 Crear Certificado
                </Link>
              </li>
              <li style={{ marginBottom: "12px" }}>
                <Link to="/medico/registrar-paciente" style={linkStyle}>
                  🩺 Registrar Paciente
                </Link>
              </li>
              <li style={{ marginBottom: "12px" }}>
                <Link to="/medico/imprimir-certificados" style={linkStyle}>
                  🖨️ Imprimir Certificados
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        {/* PIE DE BARRA LATERAL CON USUARIO Y LOGOUT */}
        <div>
          {usuario?.nombre && (
            <div style={{ fontSize: "12px", color: "#94A3B8", marginBottom: "10px", textAlign: "center" }}>
              Dr(a). <strong>{usuario.nombre}</strong>
            </div>
          )}
          <button 
            onClick={handleLogout}
            style={{
              width: "100%",
              backgroundColor: "#D50000",
              color: "#FFFFFF",
              border: "none",
              padding: "12px",
              borderRadius: "8px",
              fontWeight: "bold",
              cursor: "pointer"
            }}
          >
            🚪 Cerrar Sesión
          </button>
        </div>
      </aside>

      {/* ÁREA DE CONTENIDO */}
      <main style={{ flex: 1, backgroundColor: "#F8FAFC", padding: "30px", overflowY: "auto" }}>
        <Outlet />
      </main>

    </div>
  );
}

const linkStyle = {
  color: "#E2E8F0",
  textDecoration: "none",
  fontSize: "14px",
  fontWeight: "500",
  display: "block",
  padding: "10px 12px",
  borderRadius: "6px",
  backgroundColor: "rgba(255,255,255,0.05)"
};