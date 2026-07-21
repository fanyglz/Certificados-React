import React from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';

export const AdminLayout = () => {
  const navigate = useNavigate();

  return (
    <div style={{ display: 'flex', minHeight: '100vh', width: '100vw', overflow: 'hidden', backgroundColor: '#F8FAFC' }}>
      
      {/* 1. MENÚ LATERAL ESTILO CRUZ ROJA */}
      <aside style={{
        width: '240px',
        minWidth: '240px',
        backgroundColor: '#D32F2F',
        color: '#FFFFFF',
        display: 'flex',
        flexDirection: 'column',
        padding: '20px 12px',
        boxSizing: 'border-box'
      }}>
        <div style={{ padding: '10px', textAlign: 'center', marginBottom: '20px', borderBottom: '1px solid #334155' }}>
          <h2 style={{ margin: 0, fontSize: '20px', color: '#ffffff' }}>CRM Admin</h2>
          <small style={{ color: '#000000' }}>Cruz Roja</small>
        </div>

        <nav style={{ display: 'flex', flexDirection: 'column', gap: '8px', flex: 1 }}>
          <Link to="/admin" style={linkStyle}>🏠 Inicio</Link>
          <Link to="/admin/registrar-usuario" style={linkStyle}>👤 Registrar Usuario</Link>
          <Link to="/admin/gestion-usuarios" style={linkStyle}>⚙️ Gestionar Usuarios</Link>
          <Link to="/admin/registrar-paciente" style={linkStyle}>🏥 Registrar Paciente</Link>
          <Link to="/admin/crear-certificado" style={linkStyle}>📝 Crear Certificado</Link>
          <Link to="/admin/imprimir-certificados" style={linkStyle}>🖨️ Imprimir Certificados</Link>
        </nav>

        <button 
          onClick={() => navigate('/')} 
          style={{
            padding: '10px',
            backgroundColor: '#e7d9d9',
            color: '#000000',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontWeight: 'bold',
            marginTop: 'auto'
          }}
        >
          Cerrar Sesión
        </button>
      </aside>

      {/* 2. CONTENEDOR PRINCIPAL DERECHO (Evita desbordes de pantalla) */}
      <main style={{
        flex: 1,
        minWidth: 0,
        height: '100vh',
        overflowY: 'auto',
        overflowX: 'hidden',
        padding: '20px',
        boxSizing: 'border-box'
      }}>
        {/* <Outlet /> Renderiza la página actual seleccionada en la ruta */}
        <Outlet />
      </main>

    </div>
  );
};

const linkStyle = {
  color: '#E2E8F0',
  textDecoration: 'none',
  padding: '10px 12px',
  borderRadius: '6px',
  fontSize: '14px',
  fontWeight: '500',
  transition: 'background 0.2s',
  display: 'block'
};

export default AdminLayout;