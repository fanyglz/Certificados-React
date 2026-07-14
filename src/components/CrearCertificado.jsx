import { useEffect, useState } from "react";
import { obtenerPaciente, crearCertificado } from "../services/certificadoService";

function CrearCertificado({ idPaciente }) {
  const [paciente, setPaciente] = useState(null);
  const [cargando, setCargando] = useState(true);

  const [certificado, setCertificado] = useState({
    fecha: new Date().toISOString().split('T')[0], 
    tipo: "GENERAL",
    escolaridad: "",
    escuela: ""
  });

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCertificado((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const datosParaEnviar = {
      cer_pac: idPaciente,
      fecha: certificado.fecha,
      tipo: certificado.tipo,
      escolaridad: certificado.escolaridad,
      escuela: certificado.escuela
    };

    try {
      await crearCertificado(datosParaEnviar);
      alert("¡Certificado guardado con éxito en la base de datos!");
      setCertificado({
        fecha: new Date().toISOString().split('T')[0],
        tipo: "GENERAL",
        escolaridad: "",
        escuela: ""
      });
    } catch (error) {
      console.error("Error al guardar el certificado:", error);
      alert("Hubo un error al intentar guardar el certificado.");
    }
  };

  if (cargando) return <div style={{ textAlign: 'center', padding: '40px', fontFamily: 'Arial' }}>Cargando datos del paciente...</div>;
  if (!paciente) return <div style={{ color: 'red', padding: '20px', fontFamily: 'Arial' }}>No se encontró el paciente.</div>;

  // DECLARACIÓN CORRECTA EN JAVASCRIPT
  const styles = {
    card: { backgroundColor: '#ffffff', padding: '30px', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', maxWidth: '800px', margin: '20px auto', fontFamily: 'Arial, sans-serif' },
    title: { color: '#0056b3', borderBottom: '2px solid #eee', paddingBottom: '10px', marginBottom: '25px', fontSize: '24px' },
    sectionTitle: { color: '#666', fontSize: '18px', marginBottom: '15px', marginTop: '10px' },
    row: { display: 'flex', flexWrap: 'wrap', gap: '20px', marginBottom: '20px' },
    group50: { flex: '1 1 calc(50% - 20px)', minWidth: '280px', display: 'flex', flexDirection: 'column' },
    label: { fontWeight: 'bold', marginBottom: '6px', color: '#333', fontSize: '14px' },
    input: { padding: '10px', borderRadius: '4px', border: '1px solid #ccc', fontSize: '15px', backgroundColor: '#fff' },
    inputReadOnly: { padding: '10px', borderRadius: '4px', border: '1px solid #ddd', fontSize: '15px', backgroundColor: '#f9f9f9', color: '#555' },
    btn: { backgroundColor: '#28a745', color: '#fff', border: 'none', padding: '12px 30px', borderRadius: '5px', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer', boxShadow: '0 2px 5px rgba(0,0,0,0.15)', display: 'block', marginLeft: 'auto', marginTop: '15px' }
  };

  return (
    <div style={styles.card}>
      <h2 style={styles.title}>Generar Certificado Médico</h2>

      <form onSubmit={handleSubmit}>
        
        {/* SECCIÓN 1: DATOS DEL PACIENTE */}
        <div style={{ backgroundColor: '#f8f9fa', padding: '20px', borderRadius: '6px', marginBottom: '25px' }}>
          <h5 style={styles.sectionTitle}>Información del Paciente</h5>
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
            <div style={styles.group50}>
              <label style={styles.label}>Sexo / Género:</label>
              <input type="text" style={styles.inputReadOnly} value={paciente.sexo || 'N/A'} readOnly />
            </div>
          </div>
        </div>

        {/* SECCIÓN 2: CAMPOS DEL CERTIFICADO */}
        <h5 style={styles.sectionTitle}>Detalles del Certificado</h5>
        
        <div style={styles.row}>
          <div style={styles.group50}>
            <label style={styles.label}>Tipo de Certificado:</label>
            <select name="tipo" style={styles.input} value={certificado.tipo} onChange={handleChange} required>
              <option value="GENERAL">GENERAL</option>
              <option value="LABORAL">LABORAL</option>
              <option value="ESCOLAR">ESCOLAR</option>
              <option value="DEPORTIVO">DEPORTIVO</option>
            </select>
          </div>

          <div style={styles.group50}>
            <label style={styles.label}>Fecha de Emisión:</label>
            <input type="date" name="fecha" style={styles.input} value={certificado.fecha} onChange={handleChange} required />
          </div>
        </div>

        <div style={styles.row}>
          <div style={styles.group50}>
            <label style={styles.label}>Escuela / Institución:</label>
            <input 
              type="text" 
              name="escuela" 
              style={styles.input} 
              placeholder="Ej. Escuela Primaria Benito Juárez" 
              value={certificado.escuela} 
              onChange={handleChange} 
              required 
            />
          </div>

          <div style={styles.group50}>
            <label style={styles.label}>Nivel de Escolaridad:</label>
            <input 
              type="text" 
              name="escolaridad" 
              style={styles.input} 
              placeholder="Ej. Primaria / Licenciatura" 
              value={certificado.escolaridad} 
              onChange={handleChange} 
              required 
            />
          </div>
        </div>

        {/* BOTÓN DE ACCIÓN */}
        <button type="submit" style={styles.btn}>
          💾 Guardar Certificado
        </button>

      </form>
    </div>
  );
}

export default CrearCertificado;