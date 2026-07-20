import { useEffect, useState } from "react";
import { obtenerPaciente, crearCertificado } from "../services/certificadoService";

function CrearCertificado({ idPaciente }) {
  const [paciente, setPaciente] = useState(null);
  const [cargando, setCargando] = useState(true);

  // Unificamos todo el estado del certificado en un solo objeto para facilitar el envío
  const [certificado, setCertificado] = useState({
    fecha: new Date().toISOString().split('T')[0], 
    tipo: "GENERAL",
    escolaridad: "",
    escuela: "",
    // Signos Vitales
    ta: "",
    fc: "",
    fr: "",
    sat_o2: "",
    temperatura: "",
    peso: "",
    talla: "",
    imc: "",
    san: "SIN CONOCER",
    // Evaluación Clínica
    toxicomanias: "INTERROGADO Y NEGADO",
    fisicas: "",
    alergias: "",
    patologias: "",
    estado_paciente: "",
    otras: "",
    recomendaciones: ""
  });

  const [imcStatus, setImcStatus] = useState({ text: '', color: '', visible: false });

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

  // Efecto para calcular el IMC automáticamente cuando cambian peso o talla
  useEffect(() => {
    const peso = parseFloat(certificado.peso);
    const talla = parseFloat(certificado.talla);

    if (peso > 0 && talla > 0) {
      const imcCalculado = (peso / (talla * talla)).toFixed(2);
      let text = '';
      let color = '';
      const imcNum = parseFloat(imcCalculado);

      if (imcNum < 18.5) { text = 'Bajo Peso'; color = '#3b82f6'; }
      else if (imcNum >= 18.5 && imcNum < 25) { text = 'Normal'; color = '#22c55e'; }
      else if (imcNum >= 25 && imcNum < 30) { text = 'Sobrepeso'; color = '#eab308'; }
      else { text = 'Obesidad'; color = '#ef4444'; }

      setCertificado(prev => ({ ...prev, imc: imcCalculado }));
      setImcStatus({ text, color, visible: true });
    } else {
      setCertificado(prev => ({ ...prev, imc: '' }));
      setImcStatus({ text: '', color: '', visible: false });
    }
  }, [certificado.peso, certificado.talla]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCertificado((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Mapeamos el payload completo adaptándolo a tu Backend de PHP
    const datosParaEnviar = {
      cer_pac: idPaciente,
      fecha: certificado.fecha,
      tipo: certificado.tipo,
      escolaridad: certificado.tipo === "ESCOLAR" ? certificado.escolaridad : "",
      escuela: certificado.tipo === "ESCOLAR" ? certificado.escuela : "",
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
      
      // Resetear formulario a valores por defecto
      setCertificado({
        fecha: new Date().toISOString().split('T')[0],
        tipo: "GENERAL",
        escolaridad: "",
        escuela: "",
        ta: "", fc: "", fr: "", sat_o2: "", temperatura: "", peso: "", talla: "", imc: "",
        san: "SIN CONOCER", toxicomanias: "INTERROGADO Y NEGADO", fisicas: "",
        alergias: "", patologias: "", estado_paciente: "", otras: "", recomendaciones: ""
      });
    } catch (error) {
      console.error("Error al guardar el certificado:", error);
      alert("Hubo un error al intentar guardar el certificado.");
    }
  };

  if (cargando) return <div style={{ textAlign: 'center', padding: '40px', fontFamily: 'Arial' }}>Cargando datos del paciente...</div>;
  if (!paciente) return <div style={{ color: 'red', padding: '20px', fontFamily: 'Arial' }}>No se encontró el paciente.</div>;

  const styles = {
    card: { backgroundColor: '#ffffff', padding: '30px', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', maxWidth: '850px', margin: '20px auto', fontFamily: 'Arial, sans-serif' },
    title: { color: '#0056b3', borderBottom: '2px solid #eee', paddingBottom: '10px', marginBottom: '25px', fontSize: '24px' },
    sectionTitle: { color: '#444', fontSize: '16px', fontWeight: 'bold', marginBottom: '15px', marginTop: '20px', borderLeft: '4px solid #0056b3', paddingLeft: '8px' },
    row: { display: 'flex', flexWrap: 'wrap', gap: '20px', marginBottom: '15px' },
    group50: { flex: '1 1 calc(50% - 20px)', minWidth: '260px', display: 'flex', flexDirection: 'column' },
    group25: { flex: '1 1 calc(25% - 20px)', minWidth: '150px', display: 'flex', flexDirection: 'column' },
    group100: { flex: '1 1 100%', display: 'flex', flexDirection: 'column' },
    label: { fontWeight: 'bold', marginBottom: '6px', color: '#333', fontSize: '13px' },
    input: { padding: '10px', borderRadius: '4px', border: '1px solid #ccc', fontSize: '14px', backgroundColor: '#fff' },
    textarea: { padding: '10px', borderRadius: '4px', border: '1px solid #ccc', fontSize: '14px', backgroundColor: '#fff', fontFamily: 'Arial', resize: 'vertical', minHeight: '60px' },
    inputReadOnly: { padding: '10px', borderRadius: '4px', border: '1px solid #ddd', fontSize: '14px', backgroundColor: '#f9f9f9', color: '#555' },
    btn: { backgroundColor: '#28a745', color: '#fff', border: 'none', padding: '12px 30px', borderRadius: '5px', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer', boxShadow: '0 2px 5px rgba(0,0,0,0.15)', display: 'block', marginLeft: 'auto', marginTop: '25px' },
    required: { color: 'red', marginLeft: '3px' }
  };

  return (
    <div style={styles.card}>
      <h2 style={styles.title}>Generar Certificado Médico</h2>

      <form onSubmit={handleSubmit}>
        
        {/* SECCIÓN 1: DATOS DEL PACIENTE */}
        <div style={{ backgroundColor: '#f8f9fa', padding: '20px', borderRadius: '6px', marginBottom: '20px' }}>
          <h5 style={{ ...styles.sectionTitle, marginTop: '0', borderLeftColor: '#6c757d' }}>Información del Paciente</h5>
          <div style={styles.row}>
            <div style={styles.group50}>
              <label style={styles.label}>Nombre Completo:</label>
              <input 
                type="text" 
                style={styles.inputReadOnly} 
                value={`${paciente.nombrep || ''} ${paciente.apellido_pp || ''} ${paciente.apellido_mp || ''}`.trim()} 
                readOnly 
              />
            </div>
            <div style={styles.group25}>
              <label style={styles.label}>Sexo / Género:</label>
              <input type="text" style={styles.inputReadOnly} value={paciente.sexo || 'N/A'} readOnly />
            </div>
            <div style={styles.group25}>
              <label style={styles.label}>Edad:</label>
              <input type="text" style={styles.inputReadOnly} value={paciente.edad ? `${paciente.edad} años` : 'N/A'} readOnly />
            </div>
          </div>
        </div>

        {/* SECCIÓN 2: DETALLES GENERALES */}
        <h5 style={styles.sectionTitle}>Detalles del Certificado</h5>
        <div style={styles.row}>
          <div style={styles.group50}>
            <label style={styles.label}>Tipo de Certificado:<span style={styles.required}>*</span></label>
            <select name="tipo" style={styles.input} value={certificado.tipo} onChange={handleChange} required>
              <option value="GENERAL">GENERAL</option>
              <option value="LABORAL">LABORAL</option>
              <option value="ESCOLAR">ESCOLAR</option>
              <option value="DEPORTIVO">DEPORTIVO</option>
            </select>
          </div>

          <div style={styles.group50}>
            <label style={styles.label}>Fecha de Emisión:<span style={styles.required}>*</span></label>
            <input type="date" name="fecha" style={styles.input} value={certificado.fecha} onChange={handleChange} required />
          </div>
        </div>

        {/* SECCIÓN CONDICIONAL: DATOS ESCOLARES (Solo si tipo === 'ESCOLAR') */}
        {certificado.tipo === 'ESCOLAR' && (
          <div style={{ backgroundColor: '#f0f7ff', padding: '20px', borderRadius: '6px', marginBottom: '15px', border: '1px dashed #b6d4fe' }}>
            <h5 style={{ ...styles.sectionTitle, marginTop: '0', color: '#004085', borderLeftColor: '#004085' }}>Información Escolar</h5>
            <div style={styles.row}>
              <div style={styles.group50}>
                <label style={styles.label}>Nivel de Escolaridad:<span style={styles.required}>*</span></label>
                <input 
                  type="text" name="escolaridad" style={styles.input} 
                  placeholder="Ej. Primaria / Secundaria" value={certificado.escolaridad} 
                  onChange={handleChange} required 
                />
              </div>
              <div style={styles.group50}>
                <label style={styles.label}>Escuela / Institución:<span style={styles.required}>*</span></label>
                <input 
                  type="text" name="escuela" style={styles.input} 
                  placeholder="Ej. Escuela Primaria Benito Juárez" value={certificado.escuela} 
                  onChange={handleChange} required 
                />
              </div>
            </div>
          </div>
        )}

        {/* SECCIÓN 3: SIGNOS VITALES */}
        <h5 style={styles.sectionTitle}>Signos Vitales</h5>
        <div style={styles.row}>
          <div style={styles.group25}>
            <label style={styles.label}>P. Arterial (mmHg):<span style={styles.required}>*</span></label>
            <input type="text" name="ta" style={styles.input} placeholder="120/80" value={certificado.ta} onChange={handleChange} required />
          </div>
          <div style={styles.group25}>
            <label style={styles.label}>Frec. Cardíaca (lpm):<span style={styles.required}>*</span></label>
            <input type="number" name="fc" style={styles.input} placeholder="80" value={certificado.fc} onChange={handleChange} required />
          </div>
          <div style={styles.group25}>
            <label style={styles.label}>Frec. Resp. (rpm):<span style={styles.required}>*</span></label>
            <input type="number" name="fr" style={styles.input} placeholder="18" value={certificado.fr} onChange={handleChange} required />
          </div>
          <div style={styles.group25}>
            <label style={styles.label}>Sat. Oxígeno (%):<span style={styles.required}>*</span></label>
            <input type="number" name="sat_o2" style={styles.input} placeholder="98" value={certificado.sat_o2} onChange={handleChange} required />
          </div>
        </div>

        <div style={styles.row}>
          <div style={styles.group25}>
            <label style={styles.label}>Temperatura (°C):<span style={styles.required}>*</span></label>
            <input type="number" name="temperatura" step="0.1" style={styles.input} placeholder="36.5" value={certificado.temperatura} onChange={handleChange} required />
          </div>
          <div style={styles.group25}>
            <label style={styles.label}>Peso (kg):<span style={styles.required}>*</span></label>
            <input type="number" name="peso" step="0.1" style={styles.input} placeholder="70" value={certificado.peso} onChange={handleChange} required />
          </div>
          <div style={styles.group25}>
            <label style={styles.label}>Talla (m):<span style={styles.required}>*</span></label>
            <input type="number" name="talla" step="0.01" style={styles.input} placeholder="1.70" value={certificado.talla} onChange={handleChange} required />
          </div>
          <div style={styles.group25}>
            <label style={styles.label}>Tipo de Sangre:<span style={styles.required}>*</span></label>
            <select name="san" style={styles.input} value={certificado.san} onChange={handleChange} required>
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
        </div>

        <div style={styles.row}>
          <div style={styles.group50}>
            <label style={styles.label}>IMC (Índice de Masa Corporal):</label>
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
              <input type="text" name="imc" style={{ ...styles.inputReadOnly, width: '100%' }} readOnly placeholder="Autocalculado" value={certificado.imc} />
              {imcStatus.visible && (
                <span style={{ padding: '8px 12px', borderRadius: '4px', color: '#fff', fontWeight: 'bold', fontSize: '12px', backgroundColor: imcStatus.color, whiteSpace: 'nowrap' }}>
                  {imcStatus.text}
                </span>
              )}
            </div>
          </div>
          <div style={styles.group50}>
            <label style={styles.label}>Toxicomanías:<span style={styles.required}>*</span></label>
            <select name="toxicomanias" style={styles.input} value={certificado.toxicomanias} onChange={handleChange} required>
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

        {/* SECCIÓN 4: EVALUACIÓN CLÍNICA */}
        <h5 style={styles.sectionTitle}>Evaluación Clínica</h5>
        <div style={styles.row}>
          <div style={styles.group100}>
            <label style={styles.label}>¿Apto para actividad física?:<span style={styles.required}>*</span></label>
            <select name="fisicas" style={styles.input} value={certificado.fisicas} onChange={handleChange} required>
              <option value="">Seleccione una opción...</option>
              <option value='APTO'>APTO</option>
              <option value='NO APTO'>NO APTO</option>
              <option value='NO APTA'>NO APTA</option>
              <option value='APTA'>APTA</option>
            </select>
          </div>
        </div>

        <div style={styles.row}>
          <div style={styles.group100}>
            <label style={styles.label}>Alergias:<span style={styles.required}>*</span></label>
            <textarea name="alergias" style={styles.textarea} placeholder="Describa alergias o indique 'Negadas'" value={certificado.alergias} onChange={handleChange} required />
          </div>
        </div>

        <div style={styles.row}>
          <div style={styles.group100}>
            <label style={styles.label}>Patologías conocidas:<span style={styles.required}>*</span></label>
            <textarea name="patologias" style={styles.textarea} placeholder="Describa patologías preexistentes o indique 'Negadas'" value={certificado.patologias} onChange={handleChange} required />
          </div>
        </div>

        <div style={styles.row}>
          <div style={styles.group100}>
            <label style={styles.label}>Estado del Paciente (Clínicamente se encuentra):<span style={styles.required}>*</span></label>
            <textarea name="estado_paciente" style={styles.textarea} placeholder="Ej. Sano, sin sintomatología aguda, etc." value={certificado.estado_paciente} onChange={handleChange} required />
          </div>
        </div>

        <div style={styles.row}>
          <div style={styles.group50}>
            <label style={styles.label}>Observaciones adicionales:</label>
            <textarea name="otras" style={styles.textarea} placeholder="Observaciones fisiológicas opcionales" value={certificado.otras} onChange={handleChange} />
          </div>
          <div style={styles.group50}>
            <label style={styles.label}>Recomendaciones médicas:</label>
            <textarea name="recomendaciones" style={styles.textarea} placeholder="Recomendaciones para el paciente" value={certificado.recomendaciones} onChange={handleChange} />
          </div>
        </div>

        {/* BOTÓN DE ACCIÓN */}
        <button type="submit" style={styles.btn}>
          💾 Guardar Certificado Completo
        </button>

      </form>
    </div>
  );
}

export default CrearCertificado;