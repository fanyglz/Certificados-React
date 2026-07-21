import React, { useEffect, useState } from "react";
import { obtenerPaciente, crearCertificado } from "../services/certificadoService";

export function CrearCertificado({ idPaciente }) {
  const [paciente, setPaciente] = useState(null);
  const [cargando, setCargando] = useState(true);

  // Estado unificado para el envío al backend PHP
  const [certificado, setCertificado] = useState({
    fecha: new Date().toISOString().split('T')[0],
    tipo: "GENERAL",
    escolaridad: "",
    escuela: "",
    otraEscuela: "",
    ta: "",
    fc: "",
    fr: "",
    sat_o2: "",
    temperatura: "",
    peso: "",
    talla: "",
    imc: "",
    san: "SIN CONOCER",
    toxicomanias: "INTERROGADO Y NEGADO",
    fisicas: "",
    alergias: "",
    patologias: "",
    estado_paciente: "",
    otras: "",
    recomendaciones: ""
  });

  const [imcStatus, setImcStatus] = useState({ text: '', color: '', bg: '', visible: false });

  // 1. Carga de datos del paciente desde el backend PHP
  useEffect(() => {
    async function cargarDatos() {
      try {
        const respuesta = await obtenerPaciente(idPaciente);
        setPaciente(respuesta.data);
      } catch (error) {
        console.error("Error al traer el paciente de PHP:", error);
      } finally {
        setCargando(false);
      }
    }
    if (idPaciente) cargarDatos();
  }, [idPaciente]);

  // 2. Cálculo automático del IMC
  useEffect(() => {
    const peso = parseFloat(certificado.peso);
    const talla = parseFloat(certificado.talla);

    if (peso > 0 && talla > 0) {
      const imcCalculado = (peso / (talla * talla)).toFixed(2);
      const imcNum = parseFloat(imcCalculado);

      let text = '';
      let bg = '#6c757d';
      let color = '#ffffff';

      if (imcNum < 18.5) {
        text = 'Bajo Peso';
        bg = '#3b82f6';
      } else if (imcNum >= 18.5 && imcNum < 25) {
        text = 'Normal';
        bg = '#22c55e';
      } else if (imcNum >= 25 && imcNum < 30) {
        text = 'Sobrepeso';
        bg = '#eab308';
        color = '#000000';
      } else {
        text = 'Obesidad';
        bg = '#ef4444';
      }

      setCertificado((prev) => ({ ...prev, imc: imcCalculado }));
      setImcStatus({ text, color, bg, visible: true });
    } else {
      setCertificado((prev) => ({ ...prev, imc: '' }));
      setImcStatus({ text: '', color: '', bg: '', visible: false });
    }
  }, [certificado.peso, certificado.talla]);

  // Manejador genérico de inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCertificado((prev) => ({ ...prev, [name]: value }));
  };

  // 3. Envío del formulario a PHP
  const handleSubmit = async (e) => {
    e.preventDefault();

    const escuelaFinal = certificado.escolaridad === 'OTRO' 
      ? certificado.otraEscuela 
      : certificado.escuela;

    const datosParaEnviar = {
      cer_pac: idPaciente,
      fecha: certificado.fecha,
      tipo: certificado.tipo,
      escolaridad: certificado.tipo === "ESCOLAR" ? certificado.escolaridad : "",
      escuela: certificado.tipo === "ESCOLAR" ? escuelaFinal : "",
      ta: certificado.ta,
      fc: certificado.fc,
      fr: certificado.fr,
      sat_o2: certificado.sat_o2,
      temperatura: certificado.temperatura,
      peso: certificado.peso,
      talla: certificado.talla,
      imc: certificado.imc,
      san: certificado.san,
      toxicomanias: certificado.toxicomanias,
      fisicas: certificado.fisicas,
      alergias: certificado.alergias,
      patologias: certificado.patologias,
      estado_paciente: certificado.estado_paciente,
      otras: certificado.otras,
      recomendaciones: certificado.recomendaciones
    };

    try {
      await crearCertificado(datosParaEnviar);
      alert("¡Certificado guardado con éxito en la base de datos!");

      // Reseteo del formulario
      setCertificado({
        fecha: new Date().toISOString().split('T')[0],
        tipo: "GENERAL",
        escolaridad: "",
        escuela: "",
        otraEscuela: "",
        ta: "", fc: "", fr: "", sat_o2: "", temperatura: "", peso: "", talla: "", imc: "",
        san: "SIN CONOCER", toxicomanias: "INTERROGADO Y NEGADO", fisicas: "",
        alergias: "", patologias: "", estado_paciente: "", otras: "", recomendaciones: ""
      });
    } catch (error) {
      console.error("Error al guardar el certificado:", error);
      alert("Hubo un error al intentar guardar el certificado.");
    }
  };

  if (cargando) {
    return (
      <div style={{ textAlign: 'center', padding: '40px', fontFamily: 'Arial, sans-serif', color: '#64748b' }}>
        Cargando datos del paciente...
      </div>
    );
  }

  if (!paciente) {
    return (
      <div style={{ color: '#ef4444', textAlign: 'center', padding: '20px', fontFamily: 'Arial, sans-serif', fontWeight: 'bold' }}>
        No se encontró el paciente.
      </div>
    );
  }

  const nombreCompleto = `${paciente.nombrep || ''} ${paciente.apellido_pp || ''} ${paciente.apellido_mp || ''}`.trim();

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
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
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
        .readonly-input {
          background-color: #F8FAFC;
          color: #64748B;
          cursor: not-allowed;
          border-color: #E2E8F0;
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
        }
        .btn-primary:hover {
          background-color: #218838;
        }
      `}</style>

      <div className="form-card">
        <div className="form-header">
          <div className="form-title">Generar Certificado Médico</div>
        </div>

        <form className="modern-form" onSubmit={handleSubmit}>

          {/* DATOS DEL PACIENTE (LECTURA) */}
          <div className="form-section">
            <h4 className="section-title">Información del Paciente</h4>
            <div className="form-grid">
              <div className="input-group span-2">
                <label>Nombre Completo</label>
                <input type="text" className="form-input readonly-input" value={nombreCompleto} readOnly />
              </div>
              <div className="input-group">
                <label>Sexo / Género</label>
                <input type="text" className="form-input readonly-input" value={paciente.sexo || 'N/A'} readOnly />
              </div>
              <div className="input-group">
                <label>Edad</label>
                <input type="text" className="form-input readonly-input" value={paciente.edad ? `${paciente.edad} años` : 'N/A'} readOnly />
              </div>
            </div>
          </div>

          {/* FINALIDAD DEL DOCUMENTO */}
          <div className="form-section">
            <h4 className="section-title">Detalles del Certificado</h4>
            <div className="form-grid">
              <div className="input-group">
                <label htmlFor="tipo">Tipo de Certificado <span className="red">*</span></label>
                <select id="tipo" name="tipo" className="form-input" value={certificado.tipo} onChange={handleChange} required>
                  <option value="GENERAL">GENERAL</option>
                  <option value="LABORAL">LABORAL</option>
                  <option value="ESCOLAR">ESCOLAR</option>
                  <option value="DEPORTIVO">DEPORTIVO</option>
                  <option value="DISCAPACIDAD">DISCAPACIDAD</option>
                  <option value="CONSTANCIA DE GÉNERO">CONSTANCIA DE GÉNERO</option>
                </select>
              </div>

              <div className="input-group">
                <label htmlFor="fecha">Fecha de Emisión <span className="red">*</span></label>
                <input type="date" id="fecha" name="fecha" className="form-input" value={certificado.fecha} onChange={handleChange} required />
              </div>
            </div>
          </div>

          {/* DATOS ESCOLARES (CONDICIONAL) */}
          {certificado.tipo === 'ESCOLAR' && (
            <div className="form-section" style={{ backgroundColor: '#F0F7FF', padding: '16px', borderRadius: '8px', border: '1px dashed #B6D4FE' }}>
              <h4 className="section-title" style={{ color: '#004085', borderBottomColor: '#CBD5E1' }}>Información Escolar</h4>
              <div className="form-grid">
                <div className="input-group">
                  <label htmlFor="escolaridad">Nivel de Escolaridad <span className="red">*</span></label>
                  <select id="escolaridad" name="escolaridad" className="form-input" value={certificado.escolaridad} onChange={handleChange} required>
                    <option value="" disabled>Seleccione nivel...</option>
                    <option value="PRIMARIA">PRIMARIA</option>
                    <option value="SECUNDARIA">SECUNDARIA</option>
                    <option value="PREPARATORIA">PREPARATORIA</option>
                    <option value="UNIVERSIDAD">UNIVERSIDAD</option>
                    <option value="OTRO">OTRO</option>
                  </select>
                </div>

                {certificado.escolaridad === 'OTRO' ? (
                  <div className="input-group span-2">
                    <label htmlFor="otraEscuela">Nombre de la Institución <span className="red">*</span></label>
                    <input type="text" id="otraEscuela" name="otraEscuela" className="form-input" placeholder="Escriba la institución" value={certificado.otraEscuela} onChange={handleChange} required />
                  </div>
                ) : (
                  <div className="input-group span-2">
                    <label htmlFor="escuela">Escuela / Institución <span className="red">*</span></label>
                    <input type="text" id="escuela" name="escuela" className="form-input" placeholder="Ej. Escuela Primaria Benito Juárez" value={certificado.escuela} onChange={handleChange} required />
                  </div>
                )}
              </div>
            </div>
          )}

          {/* SIGNOS VITALES */}
          <div className="form-section">
            <h4 className="section-title">Signos Vitales</h4>
            <div className="form-grid">
              <div className="input-group">
                <label htmlFor="ta">P. Arterial (mmHg) <span className="red">*</span></label>
                <input type="text" id="ta" name="ta" className="form-input" maxLength="7" placeholder="120/80" value={certificado.ta} onChange={handleChange} required />
              </div>
              <div className="input-group">
                <label htmlFor="fc">Frec. Cardíaca (lpm) <span className="red">*</span></label>
                <input type="number" id="fc" name="fc" className="form-input" placeholder="80" value={certificado.fc} onChange={handleChange} required />
              </div>
              <div className="input-group">
                <label htmlFor="fr">Frec. Resp. (rpm) <span className="red">*</span></label>
                <input type="number" id="fr" name="fr" className="form-input" placeholder="18" value={certificado.fr} onChange={handleChange} required />
              </div>
              <div className="input-group">
                <label htmlFor="sat_o2">Sat. Oxígeno (%) <span className="red">*</span></label>
                <input type="number" id="sat_o2" name="sat_o2" className="form-input" max="100" min="0" placeholder="98" value={certificado.sat_o2} onChange={handleChange} required />
              </div>
              <div className="input-group">
                <label htmlFor="temperatura">Temperatura (°C) <span className="red">*</span></label>
                <input type="number" id="temperatura" name="temperatura" className="form-input" step="0.1" placeholder="36.5" value={certificado.temperatura} onChange={handleChange} required />
              </div>
              <div className="input-group">
                <label htmlFor="peso">Peso (kg) <span className="red">*</span></label>
                <input type="number" id="peso" name="peso" className="form-input" step="0.1" placeholder="70" value={certificado.peso} onChange={handleChange} required />
              </div>
              <div className="input-group">
                <label htmlFor="talla">Talla (m) <span className="red">*</span></label>
                <input type="number" id="talla" name="talla" className="form-input" max="2.72" step="0.01" placeholder="1.70" value={certificado.talla} onChange={handleChange} required />
              </div>

              {/* IMC AUTOCALCULADO */}
              <div className="input-group">
                <label htmlFor="imc">IMC</label>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                  <input type="text" id="imc" name="imc" className="form-input readonly-input" readOnly placeholder="Automático" value={certificado.imc} />
                  {imcStatus.visible && (
                    <span style={{ backgroundColor: imcStatus.bg, color: imcStatus.color, padding: '6px 10px', borderRadius: '4px', fontSize: '11px', fontWeight: 'bold', whiteSpace: 'nowrap' }}>
                      {imcStatus.text}
                    </span>
                  )}
                </div>
              </div>

              <div className="input-group span-2">
                <label htmlFor="san">Tipo de Sangre <span className="red">*</span></label>
                <select id="san" name="san" className="form-input" value={certificado.san} onChange={handleChange} required>
                  <option value="SIN CONOCER">SIN CONOCER</option>
                  <option value="A+">A +</option>
                  <option value="A-">A -</option>
                  <option value="O+">O +</option>
                  <option value="O-">O -</option>
                  <option value="B+">B +</option>
                  <option value="B-">B -</option>
                  <option value="AB+">AB +</option>
                  <option value="AB-">AB -</option>
                </select>
              </div>

              <div className="input-group span-2">
                <label htmlFor="toxicomanias">Toxicomanías <span className="red">*</span></label>
                <select id="toxicomanias" name="toxicomanias" className="form-input" value={certificado.toxicomanias} onChange={handleChange} required>
                  <option value='INTERROGADO Y NEGADO'>INTERROGADO Y NEGADO</option>
                  <option value='ALCOHOL'>ALCOHOL</option>
                  <option value='DROGAS'>DROGAS</option>
                  <option value='TABACO'>TABACO</option>
                  <option value='ALCOHOLYDROGAS'>ALCOHOL + DROGAS</option>
                  <option value='ALCOHOLYTABACO'>ALCOHOL + TABACO</option>
                  <option value='DROGASYTABACO'>DROGAS + TABACO</option>
                  <option value='ALCOHOLYDROGASYTABACO'>ALCOHOL + DROGAS + TABACO</option>
                </select>
              </div>
            </div>
          </div>

          {/* EVALUACIÓN CLÍNICA */}
          <div className="form-section">
            <h4 className="section-title">Evaluación Clínica</h4>
            <div className="form-grid">
              <div className="input-group span-full">
                <label htmlFor="fisicas">¿Apto para actividad física? <span className="red">*</span></label>
                <select id="fisicas" name="fisicas" className="form-input" value={certificado.fisicas} onChange={handleChange} required>
                  <option value="" disabled>Seleccione una opción...</option>
                  <option value='APTO'>APTO</option>
                  <option value='NO APTO'>NO APTO</option>
                  <option value='APTA'>APTA</option>
                  <option value='NO APTA'>NO APTA</option>
                </select>
              </div>

              <div className="input-group span-full">
                <label htmlFor="alergias">Alergias <span className="red">*</span></label>
                <textarea id="alergias" name="alergias" className="form-input" rows="2" placeholder="Describa alergias o indique 'Negadas'" value={certificado.alergias} onChange={handleChange} required />
              </div>

              <div className="input-group span-full">
                <label htmlFor="patologias">Patologías Conocidas <span className="red">*</span></label>
                <textarea id="patologias" name="patologias" className="form-input" rows="2" placeholder="Describa patologías preexistentes o indique 'Negadas'" value={certificado.patologias} onChange={handleChange} required />
              </div>

              <div className="input-group span-full">
                <label htmlFor="estado_paciente">Estado del Paciente (Encontrándose clínicamente) <span className="red">*</span></label>
                <textarea id="estado_paciente" name="estado_paciente" className="form-input" rows="2" placeholder="Ej. Sano, asintomático, etc." value={certificado.estado_paciente} onChange={handleChange} required />
              </div>

              <div className="input-group span-2">
                <label htmlFor="otras">Observaciones Adicionales</label>
                <textarea id="otras" name="otras" className="form-input" rows="2" placeholder="Observaciones fisiológicas opcionales" value={certificado.otras} onChange={handleChange} />
              </div>

              <div className="input-group span-2">
                <label htmlFor="recomendaciones">Recomendaciones Médicas</label>
                <textarea id="recomendaciones" name="recomendaciones" className="form-input" rows="2" placeholder="Recomendaciones para el paciente" value={certificado.recomendaciones} onChange={handleChange} />
              </div>
            </div>
          </div>

          <div className="form-actions">
            <p style={{ fontSize: '12px', color: '#64748B', margin: 0 }}>
              <span className="red">*</span> Campos obligatorios
            </p>
            <button type="submit" className="btn-primary">
              💾 Guardar Certificado Completo
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}

export default CrearCertificado;