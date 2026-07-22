import { useState } from "react";

function Admin() {
  return (
    <div style={{ width: "100%" }}>
      <div className="form-card">
        <div className="form-header">
          <div>
            <h1 className="page-title" style={{ color: "var(--primary-red)" }}>
              Panel de Administración
            </h1>
            <p style={{ marginTop: "6px", color: "var(--text-secondary)", fontSize: "14px" }}>
              Bienvenido al Sistema de Gestión de Certificados Médicos de la Cruz Roja Mexicana.
            </p>
          </div>
          <span className="admin-badge">Administrador General</span>
        </div>

        <div className="modern-form">
          <div className="highlight-section">
            <h3 className="section-title">Acceso Rápido</h3>
            <p style={{ fontSize: "14px", color: "var(--text-secondary)", lineHeight: "1.6" }}>
              Utiliza el menú lateral para gestionar usuarios o dar de alta nuevos médicos en la plataforma.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Admin;