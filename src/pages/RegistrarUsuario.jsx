import React, { useState, useRef, useEffect } from "react";
import { registrarUsuario } from "../services/userService";

function RegistrarUsuario() {
  const [nombre, setNombre] = useState("");
  const [apellidoP, setApellidoP] = useState("");
  const [apellidoM, setApellidoM] = useState("");
  const [correo, setCorreo] = useState("");
  const [tipoUsuario, setTipoUsuario] = useState("1");
  const [sexo, setSexo] = useState("MASCULINO");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [cedula, setCedula] = useState("");
  const [especialidad, setEspecialidad] = useState("");

  // Referencia y estado para el lienzo de la firma
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);

  // Inicialización del Canvas para la firma
  useEffect(() => {
    if (tipoUsuario === "1" && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      ctx.lineWidth = 2;
      ctx.lineCap = "round";
      ctx.strokeStyle = "#000000";
    }
  }, [tipoUsuario]);

  // Funciones para dibujar en el Canvas
  const startDrawing = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX || e.touches?.[0]?.clientX) - rect.left;
    const y = (e.clientY || e.touches?.[0]?.clientY) - rect.top;
    
    ctx.beginPath();
    ctx.moveTo(x, y);
    setIsDrawing(true);
  };

  const draw = (e) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX || e.touches?.[0]?.clientX) - rect.left;
    const y = (e.clientY || e.touches?.[0]?.clientY) - rect.top;

    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const limpiarFirma = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  };

  const handleRegistrar = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Las contraseñas no coinciden");
      return;
    }

    const datos = {
      rol: tipoUsuario,
      app: apellidoP.toUpperCase(),
      amp: apellidoM.toUpperCase(),
      nom: nombre.toUpperCase(),
      sexu: sexo,
      corr: correo,
      pass: password,
    };

    if (tipoUsuario === "1") {
      datos.ced = cedula;
      datos.esp = especialidad;

      if (canvasRef.current) {
        const firma = canvasRef.current.toDataURL("image/png");
        datos.img = firma;
      }
    }

    try {
      const response = await registrarUsuario(datos);
      alert(response?.Message || "Usuario registrado exitosamente");
      
      // Limpiar formulario si es necesario
      setNombre("");
      setApellidoP("");
      setApellidoM("");
      setCorreo("");
      setPassword("");
      setConfirmPassword("");
      setCedula("");
      setEspecialidad("");
      limpiarFirma();
    } catch (error) {
      console.error("Error al registrar usuario:", error);
      alert("Hubo un error al registrar el usuario.");
    }
  };

  return (
    <div className="form-card-wrapper" style={{ width: '100%', maxWidth: '900px', margin: '20px auto', fontFamily: 'Arial, sans-serif' }}>
      <style>{`
        .form-card {
          background: #ffffff;
          border-radius: 10px;
          border: 1px solid #E2E8F0;
          box-shadow: 0 4px 12px rgba(0,0,0,0.08);
          overflow: hidden;
        }
        .form-header {
          background: #1E293B;
          color: #ffffff;
          padding: 18px 24px;
        }
        .form-title {
          font-size: 20px;
          font-weight: 700;
          margin: 0;
        }
        .modern-form {
          padding: 24px;
        }
        .form-section {
          margin-bottom: 24px;
        }
        .section-title {
          font-size: 15px;
          font-weight: 700;
          color: #DC2626;
          border-bottom: 2px solid #FEE2E2;
          padding-bottom: 6px;
          margin-bottom: 16px;
          margin-top: 0;
        }
        .form-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 16px;
        }
        .input-group {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .input-group.span-2 {
          grid-column: span 2;
        }
        .input-group.span-full {
          grid-column: 1 / -1;
        }
        @media (max-width: 640px) {
          .input-group.span-2 {
            grid-column: span 1;
          }
        }
        .input-group label {
          font-size: 13px;
          font-weight: 600;
          color: #334155;
        }
        .form-input {
          width: 100%;
          padding: 10px 12px;
          border: 1px solid #CBD5E1;
          border-radius: 6px;
          font-size: 14px;
          box-sizing: border-box;
          outline: none;
          font-family: inherit;
        }
        .form-input:focus {
          border-color: #DC2626;
          box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.1);
        }
        .red { color: #DC2626; }
        .form-actions {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 24px;
          padding-top: 16px;
          border-top: 1px solid #E2E8F0;
        }
        .btn-primary {
          background-color: #28a745;
          color: white;
          border: none;
          padding: 12px 24px;
          border-radius: 6px;
          font-weight: 600;
          font-size: 15px;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
          transition: background-color 0.2s;
        }
        .btn-primary:hover {
          background-color: #218838;
        }
        .btn-secondary {
          background-color: #64748B;
          color: white;
          border: none;
          padding: 6px 12px;
          border-radius: 4px;
          font-size: 12px;
          font-weight: 600;
          cursor: pointer;
        }
        .btn-secondary:hover {
          background-color: #475569;
        }
        .signature-container {
          border: 2px dashed #CBD5E1;
          border-radius: 8px;
          background-color: #F8FAFC;
          padding: 12px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
        }
        .signature-canvas {
          background: #ffffff;
          border: 1px solid #CBD5E1;
          border-radius: 6px;
          cursor: crosshair;
          touch-action: none;
        }
      `}</style>

      <div className="form-card">
        <div className="form-header">
          <div className="form-title">Registrar Nuevo Usuario</div>
        </div>

        <form className="modern-form" onSubmit={handleRegistrar}>
          
          {/* DATOS PERSONALES */}
          <div className="form-section">
            <h4 className="section-title">Información Personal</h4>
            <div className="form-grid">
              
              <div className="input-group">
                <label htmlFor="nombre">Nombre <span className="red">*</span></label>
                <input
                  type="text"
                  id="nombre"
                  className="form-input"
                  placeholder="Ej. Juan"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  required
                />
              </div>

              <div className="input-group">
                <label htmlFor="apellidoP">Apellido Paterno <span className="red">*</span></label>
                <input
                  type="text"
                  id="apellidoP"
                  className="form-input"
                  placeholder="Ej. Pérez"
                  value={apellidoP}
                  onChange={(e) => setApellidoP(e.target.value)}
                  required
                />
              </div>

              <div className="input-group">
                <label htmlFor="apellidoM">Apellido Materno <span className="red">*</span></label>
                <input
                  type="text"
                  id="apellidoM"
                  className="form-input"
                  placeholder="Ej. Gómez"
                  value={apellidoM}
                  onChange={(e) => setApellidoM(e.target.value)}
                  required
                />
              </div>

              <div className="input-group">
                <label htmlFor="sexo">Sexo <span className="red">*</span></label>
                <select
                  id="sexo"
                  className="form-input"
                  value={sexo}
                  onChange={(e) => setSexo(e.target.value)}
                  required
                >
                  <option value="MASCULINO">MASCULINO</option>
                  <option value="FEMENINO">FEMENINO</option>
                </select>
              </div>

            </div>
          </div>

          {/* DATOS DE CUENTA */}
          <div className="form-section">
            <h4 className="section-title">Datos de Acceso y Rol</h4>
            <div className="form-grid">

              <div className="input-group span-2">
                <label htmlFor="correo">Correo Electrónico <span className="red">*</span></label>
                <input
                  type="email"
                  id="correo"
                  className="form-input"
                  placeholder="ejemplo@correo.com"
                  value={correo}
                  onChange={(e) => setCorreo(e.target.value)}
                  required
                />
              </div>

              <div className="input-group">
                <label htmlFor="tipoUsuario">Tipo de Usuario / Rol <span className="red">*</span></label>
                <select
                  id="tipoUsuario"
                  className="form-input"
                  value={tipoUsuario}
                  onChange={(e) => setTipoUsuario(e.target.value)}
                  required
                >
                  <option value="1">MÉDICO</option>
                  <option value="3">RECEPCIONISTA</option>
                </select>
              </div>

              <div className="input-group">
                <label htmlFor="password">Contraseña <span className="red">*</span></label>
                <input
                  type="password"
                  id="password"
                  className="form-input"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <div className="input-group">
                <label htmlFor="confirmPassword">Confirmar Contraseña <span className="red">*</span></label>
                <input
                  type="password"
                  id="confirmPassword"
                  className="form-input"
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>

            </div>
          </div>

          {/* DATOS PROFESIONALES (SÓLO MÉDICOS) */}
          {tipoUsuario === "1" && (
            <div className="form-section">
              <h4 className="section-title">Información Profesional Médica</h4>
              <div className="form-grid">

                <div className="input-group">
                  <label htmlFor="cedula">Cédula Profesional <span className="red">*</span></label>
                  <input
                    type="text"
                    id="cedula"
                    className="form-input"
                    placeholder="Ej. 12345678"
                    value={cedula}
                    onChange={(e) => setCedula(e.target.value)}
                    required
                  />
                </div>

                <div className="input-group">
                  <label htmlFor="especialidad">Especialidad <span className="red">*</span></label>
                  <select
                    id="especialidad"
                    className="form-input"
                    value={especialidad}
                    onChange={(e) => setEspecialidad(e.target.value)}
                    required
                  >
                    <option value="" disabled>Seleccione especialidad</option>
                    <option value="1">Cardiología</option>
                    <option value="2">Dermatología</option>
                    <option value="3">Gastroenterología</option>
                    <option value="4">Medicina Interna</option>
                    <option value="5">Médico General</option>
                  </select>
                </div>

                {/* LIENZO DE FIRMA AUTÓGRAFA */}
                <div className="input-group span-full">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                    <label>Firma Autógrafa Digital</label>
                    <button type="button" className="btn-secondary" onClick={limpiarFirma}>
                      🧹 Limpiar Firma
                    </button>
                  </div>
                  <div className="signature-container">
                    <canvas
                      ref={canvasRef}
                      width="400"
                      height="150"
                      className="signature-canvas"
                      onMouseDown={startDrawing}
                      onMouseMove={draw}
                      onMouseUp={stopDrawing}
                      onMouseLeave={stopDrawing}
                      onTouchStart={startDrawing}
                      onTouchMove={draw}
                      onTouchEnd={stopDrawing}
                    />
                    <span style={{ fontSize: '12px', color: '#64748B' }}>
                      Dibuje la firma dentro del recuadro con el ratón o pantalla táctil
                    </span>
                  </div>
                </div>

              </div>
            </div>
          )}

          <div className="form-actions">
            <p style={{ fontSize: '12px', color: '#64748B', margin: 0 }}>
              <span className="red">*</span> Campos obligatorios
            </p>
            <button type="submit" className="btn-primary">
              👤 Registrar Usuario
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}

export default RegistrarUsuario;