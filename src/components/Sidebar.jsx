function Sidebar({ setVista }) {
  return (
    <aside
      style={{
        width: "220px",
        background: "#1f2937",
        color: "white",
        minHeight: "100vh",
        padding: "20px"
      }}
    >
      <h2>CRM Admin</h2>

      <hr />

      <button
        onClick={() => setVista("inicio")}
        style={{ display: "block", width: "100%", margin: "10px 0" }}
      >
        Inicio
      </button>

      <button
        onClick={() => setVista("usuarios")}
        style={{ display: "block", width: "100%", margin: "10px 0" }}
      >
        Registrar Usuario
      </button>

      <button
        onClick={() => setVista("gestionar")}
        style={{ display: "block", width: "100%", margin: "10px 0" }}
      >
  Gestionar Usuarios
</button>
      <button
        onClick={() => setVista("pacientes")}
        style={{ display: "block", width: "100%", margin: "10px 0" }}
      >
        Registrar Paciente
      </button>

      <button
        onClick={() => setVista("certificados")}
        style={{ display: "block", width: "100%", margin: "10px 0" }}
      >
        Crear Certificado
      </button>

      <button
        onClick={() => setVista("imprimir")}
        style={{ display: "block", width: "100%", margin: "10px 0" }}
      >
        Imprimir Certificados
      </button>
    </aside>
  );
}

export default Sidebar;