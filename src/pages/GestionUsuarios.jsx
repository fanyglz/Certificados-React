import React, { useState, useEffect } from 'react';

export const GestionUsuarios = () => {
  // --- ESTADOS DE LA VISTA Y BÚSQUEDA ---
  const [usuarios, setUsuarios] = useState([]);
  const [busqueda, setBusqueda] = useState('');
  const [cargando, setCargando] = useState(true);

  // --- ESTADOS DEL MODAL Y FORMULARIO DE EDICIÓN ---
  const [mostrarModal, setMostrarModal] = useState(false);
  const [usuarioEditando, setUsuarioEditando] = useState({
    id: '',
    nombre: '',
    ap: '',
    am: '',
    sexo: 'MASCULINO',
    correo: '',
    password: '',
    rol: '1',
    cedula: '',
    especialidad: '0'
  });

  useEffect(() => {
    cargarUsuarios();
  }, []);

  const cargarUsuarios = async () => {
    try {
      setCargando(true);
      setTimeout(() => {
        setUsuarios([
          {
            id: 1,
            nombre: 'Juan',
            ap: 'Pérez',
            am: 'Gómez',
            correo: 'juan.perez@medico.com',
            rol: 'MÉDICO',
            idRol: '1',
            cedula: '12345678',
            sexo: 'MASCULINO',
            activo: true,
            especialidad: '1'
          },
          {
            id: 2,
            nombre: 'Maria',
            ap: 'Lopez',
            am: 'Hernandez',
            correo: 'maria.lopez@recepcion.com',
            rol: 'RECEPCIÓN',
            idRol: '3',
            cedula: 'N/A',
            sexo: 'FEMENINO',
            activo: false,
            especialidad: '0'
          }
        ]);
        setCargando(false);
      }, 500);
    } catch (error) {
      console.error('Error al cargar usuarios:', error);
      setCargando(false);
    }
  };

  const usuariosFiltrados = usuarios.filter((usr) => {
    const nombreCompleto = `${usr.nombre} ${usr.ap} ${usr.am}`.toLowerCase();
    const correo = usr.correo.toLowerCase();
    const query = busqueda.toLowerCase();
    return nombreCompleto.includes(query) || correo.includes(query);
  });

  const abrirModalEditar = (usuario) => {
    setUsuarioEditando({
      id: usuario.id,
      nombre: usuario.nombre,
      ap: usuario.ap,
      am: usuario.am,
      sexo: usuario.sexo,
      correo: usuario.correo,
      password: '',
      rol: usuario.idRol,
      cedula: usuario.cedula,
      especialidad: usuario.especialidad || '0'
    });
    setMostrarModal(true);
  };

  const cerrarModal = () => setMostrarModal(false);

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setUsuarioEditando((prev) => ({ ...prev, [name]: value }));
  };

  const guardarEdicion = async () => {
    try {
      setUsuarios((prev) =>
        prev.map((u) =>
          u.id === usuarioEditando.id
            ? {
                ...u,
                nombre: usuarioEditando.nombre,
                ap: usuarioEditando.ap,
                am: usuarioEditando.am,
                correo: usuarioEditando.correo,
                idRol: usuarioEditando.rol,
                rol: usuarioEditando.rol === '1' ? 'MÉDICO' : 'RECEPCIÓN',
                cedula: usuarioEditando.cedula,
                sexo: usuarioEditando.sexo
              }
            : u
        )
      );
      alert('¡Usuario actualizado con éxito!');
      cerrarModal();
    } catch (error) {
      console.error('Error al guardar edición:', error);
      alert('Ocurrió un error al guardar los cambios.');
    }
  };

  const toggleEstadoUsuario = async (id, estadoActual) => {
    const accion = estadoActual ? 'desactivar' : 'activar';
    if (window.confirm(`¿Estás seguro de que deseas ${accion} a este usuario?`)) {
      setUsuarios((prev) =>
        prev.map((u) => (u.id === id ? { ...u, activo: !estadoActual } : u))
      );
    }
  };

  return (
    <div className="cr-wrapper">
      {/* CORRECCIÓN RIGUROSA DE BORDES Y DESBORDAMIENTOS */}
      <style>{`
        .cr-wrapper, .cr-wrapper * {
          box-sizing: border-box !important;
        }

        .cr-wrapper {
          width: 100%;
          max-width: 100%;
          padding: 16px;
          margin: 0 auto;
          overflow-x: hidden;
          font-family: 'Segoe UI', system-ui, -apple-system, sans-serif;
        }

        /* HEADER */
        .cr-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
          padding-bottom: 12px;
          border-bottom: 2px solid #E2E8F0;
          flex-wrap: wrap;
          gap: 12px;
        }
        .cr-title {
          color: #B71C1C;
          font-size: 22px;
          font-weight: 700;
          margin: 0;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .cr-badge {
          background-color: #FFEBEE;
          color: #C62828;
          padding: 6px 14px;
          border-radius: 20px;
          font-weight: 600;
          font-size: 13px;
          border: 1px solid #FFCDD2;
        }

        /* CARD PRINCIPAL */
        .cr-card {
          background: #FFFFFF;
          border-radius: 10px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
          border: 1px solid #E2E8F0;
          width: 100%;
          max-width: 100%;
          overflow: hidden;
        }
        .cr-card-header {
          padding: 16px 20px;
          background: #FAFAFA;
          border-bottom: 1px solid #EEEEEE;
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 12px;
        }
        .cr-card-title {
          font-size: 16px;
          font-weight: 700;
          color: #212121;
          margin: 0;
        }

        .cr-search-input {
          padding: 8px 14px;
          border: 1px solid #CFD8DC;
          border-radius: 6px;
          outline: none;
          width: 100%;
          max-width: 260px;
          font-size: 14px;
        }
        .cr-search-input:focus {
          border-color: #D32F2F;
          box-shadow: 0 0 0 3px rgba(211, 47, 47, 0.15);
        }

        /* CONTENEDOR DE LA TABLA (Mantiene la tabla dentro del recuadro) */
        .cr-table-container {
          width: 100%;
          max-width: 100%;
          overflow-x: auto;
          -webkit-overflow-scrolling: touch;
        }

        .cr-table {
          width: 100%;
          border-collapse: collapse;
          text-align: left;
          font-size: 13px;
        }
        .cr-table th {
          background-color: #D32F2F;
          color: #FFFFFF;
          padding: 12px 14px;
          font-weight: 600;
          white-space: nowrap;
        }
        .cr-table td {
          padding: 12px 14px;
          border-bottom: 1px solid #ECEFF1;
          color: #37474F;
          white-space: nowrap;
        }
        .cr-table tbody tr:hover {
          background-color: #FFEBEE;
        }
        .cr-row-inactive {
          background-color: #FAFAFA;
          opacity: 0.6;
        }

        /* ESTADOS Y BOTONES */
        .cr-status {
          display: inline-flex;
          align-items: center;
          padding: 4px 10px;
          border-radius: 12px;
          font-size: 11px;
          font-weight: 600;
        }
        .cr-status-active { background-color: #E8F5E9; color: #2E7D32; }
        .cr-status-inactive { background-color: #FFEBEE; color: #C62828; }

        .cr-actions { display: flex; gap: 6px; }
        .cr-btn-icon {
          width: 30px;
          height: 30px;
          border-radius: 6px;
          border: none;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
        }
        .cr-btn-edit { background-color: #E3F2FD; color: #1565C0; }
        .cr-btn-off { background-color: #FFEBEE; color: #C62828; }
        .cr-btn-on { background-color: #E8F5E9; color: #2E7D32; }

        /* FOOTER / PAGINACIÓN */
        .cr-footer {
          padding: 14px 20px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          background-color: #FAFAFA;
          border-top: 1px solid #EEEEEE;
          flex-wrap: wrap;
          gap: 10px;
        }
        .cr-page-btn {
          padding: 5px 12px;
          border: 1px solid #CFD8DC;
          background: #FFFFFF;
          border-radius: 4px;
          cursor: pointer;
          font-weight: 600;
          font-size: 13px;
        }
        .cr-page-btn.active {
          background: #D32F2F;
          color: #FFFFFF;
          border-color: #D32F2F;
        }

        /* MODAL */
        .cr-modal-overlay {
          position: fixed;
          top: 0; left: 0; right: 0; bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          padding: 16px;
        }
        .cr-modal {
          background: #FFFFFF;
          border-radius: 10px;
          width: 100%;
          max-width: 550px;
          overflow: hidden;
          box-shadow: 0 10px 25px rgba(0,0,0,0.2);
        }
        .cr-modal-header {
          background: #D32F2F;
          color: #FFFFFF;
          padding: 14px 20px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .cr-modal-body { padding: 20px; }
        .cr-form-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 12px;
        }
        .cr-span-2 { grid-column: span 2; }
        .cr-input-group label {
          display: block;
          font-size: 12px;
          font-weight: 600;
          margin-bottom: 4px;
          color: #455A64;
        }
        .cr-form-input {
          width: 100%;
          padding: 8px 10px;
          border: 1px solid #CFD8DC;
          border-radius: 6px;
          outline: none;
          font-size: 13px;
        }
        .cr-modal-footer {
          padding: 12px 20px;
          background: #FAFAFA;
          display: flex;
          justify-content: flex-end;
          gap: 10px;
          border-top: 1px solid #EEEEEE;
        }
        .cr-btn-secondary {
          padding: 8px 16px;
          border: 1px solid #CFD8DC;
          background: #FFFFFF;
          border-radius: 6px;
          cursor: pointer;
        }
        .cr-btn-primary {
          padding: 8px 16px;
          border: none;
          background: #D32F2F;
          color: #FFFFFF;
          border-radius: 6px;
          cursor: pointer;
        }
      `}</style>

      {/* ENCABEZADO */}
      <header className="cr-header">
        <h2 className="cr-title">
          <span>✚</span> Panel Administrativo
        </h2>
        <span className="cr-badge">admin@sistema.com</span>
      </header>

      {/* TARJETA DE CONTENIDO */}
      <div className="cr-card">
        <div className="cr-card-header">
          <h3 className="cr-card-title">Gestión de Usuarios</h3>
          <input
            type="text"
            placeholder="Buscar por nombre o correo..."
            className="cr-search-input"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />
        </div>

        <div className="cr-table-container">
          <table className="cr-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre Completo</th>
                <th>Correo Electrónico</th>
                <th>Rol</th>
                <th>Cédula</th>
                <th>Sexo</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {cargando ? (
                <tr>
                  <td colSpan="8" style={{ textAlign: 'center', padding: '24px' }}>
                    Cargando usuarios...
                  </td>
                </tr>
              ) : usuariosFiltrados.length === 0 ? (
                <tr>
                  <td colSpan="8" style={{ textAlign: 'center', padding: '24px' }}>
                    No se encontraron registros.
                  </td>
                </tr>
              ) : (
                usuariosFiltrados.map((usr) => (
                  <tr key={usr.id} className={!usr.activo ? 'cr-row-inactive' : ''}>
                    <td><strong>{usr.id}</strong></td>
                    <td>{`${usr.nombre} ${usr.ap} ${usr.am}`}</td>
                    <td>{usr.correo}</td>
                    <td>{usr.rol}</td>
                    <td>{usr.cedula}</td>
                    <td>{usr.sexo}</td>
                    <td>
                      <span className={`cr-status ${usr.activo ? 'cr-status-active' : 'cr-status-inactive'}`}>
                        {usr.activo ? '● Activo' : '● Inactivo'}
                      </span>
                    </td>
                    <td>
                      <div className="cr-actions">
                        <button
                          className="cr-btn-icon cr-btn-edit"
                          title="Editar usuario"
                          onClick={() => abrirModalEditar(usr)}
                        >
                          ✏️
                        </button>
                        <button
                          className={`cr-btn-icon ${usr.activo ? 'cr-btn-off' : 'cr-btn-on'}`}
                          title={usr.activo ? 'Desactivar usuario' : 'Activar usuario'}
                          onClick={() => toggleEstadoUsuario(usr.id, usr.activo)}
                        >
                          {usr.activo ? '🚫' : '✅'}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="cr-footer">
          <span style={{ fontSize: '13px', color: '#607D8B' }}>
            Mostrando <strong>{usuariosFiltrados.length}</strong> registros
          </span>
          <div style={{ display: 'flex', gap: '4px' }}>
            <button className="cr-page-btn" disabled>Anterior</button>
            <button className="cr-page-btn active">1</button>
            <button className="cr-page-btn" disabled>Siguiente</button>
          </div>
        </div>
      </div>

      {/* MODAL DE EDICIÓN */}
      {mostrarModal && (
        <div className="cr-modal-overlay">
          <div className="cr-modal">
            <div className="cr-modal-header">
              <h3 style={{ margin: 0, fontSize: '16px' }}>Editar Usuario</h3>
              <button 
                onClick={cerrarModal} 
                style={{ background: 'none', border: 'none', color: '#fff', fontSize: '18px', cursor: 'pointer' }}
              >
                ✕
              </button>
            </div>

            <div className="cr-modal-body">
              <div className="cr-form-grid">
                <div className="cr-input-group">
                  <label>Nombre(s)</label>
                  <input
                    type="text"
                    name="nombre"
                    className="cr-form-input"
                    value={usuarioEditando.nombre}
                    onChange={handleEditChange}
                    readOnly
                  />
                </div>

                <div className="cr-input-group">
                  <label>Apellido Paterno</label>
                  <input
                    type="text"
                    name="ap"
                    className="cr-form-input"
                    value={usuarioEditando.ap}
                    onChange={handleEditChange}
                    readOnly
                  />
                </div>

                <div className="cr-input-group">
                  <label>Apellido Materno</label>
                  <input
                    type="text"
                    name="am"
                    className="cr-form-input"
                    value={usuarioEditando.am}
                    onChange={handleEditChange}
                    readOnly
                  />
                </div>

                <div className="cr-input-group">
                  <label>Sexo</label>
                  <select
                    name="sexo"
                    className="cr-form-input"
                    value={usuarioEditando.sexo}
                    onChange={handleEditChange}
                    disabled
                  >
                    <option value="MASCULINO">MASCULINO</option>
                    <option value="FEMENINO">FEMENINO</option>
                  </select>
                </div>

                <div className="cr-input-group cr-span-2">
                  <label>Correo Electrónico</label>
                  <input
                    type="email"
                    name="correo"
                    className="cr-form-input"
                    value={usuarioEditando.correo}
                    onChange={handleEditChange}
                    readOnly
                  />
                </div>

                <div className="cr-input-group cr-span-2">
                  <label>Nueva Contraseña</label>
                  <input
                    type="password"
                    name="password"
                    className="cr-form-input"
                    placeholder="Dejar vacío para mantener la actual"
                    value={usuarioEditando.password}
                    onChange={handleEditChange}
                  />
                </div>

                <div className="cr-input-group">
                  <label>Rol de Usuario</label>
                  <select
                    name="rol"
                    className="cr-form-input"
                    value={usuarioEditando.rol}
                    onChange={handleEditChange}
                    disabled
                  >
                    <option value="1">MÉDICO</option>
                    <option value="3">RECEPCIÓN</option>
                  </select>
                </div>

                {usuarioEditando.rol === '1' && (
                  <div className="cr-input-group">
                    <label>Cédula Profesional</label>
                    <input
                      type="text"
                      name="cedula"
                      className="cr-form-input"
                      value={usuarioEditando.cedula}
                      onChange={handleEditChange}
                      readOnly
                    />
                  </div>
                )}
              </div>
            </div>

            <div className="cr-modal-footer">
              <button className="cr-btn-secondary" onClick={cerrarModal}>
                Cancelar
              </button>
              <button className="cr-btn-primary" onClick={guardarEdicion}>
                Guardar Cambios
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GestionUsuarios;