import { useEffect, useState } from "react";
// Importamos correctamente ambas funciones de tu servicio de Axios
import { obtenerPaciente, crearCertificado } from "../services/certificadoService";

function CrearCertificado({ idPaciente }) {
  // Estado para los datos que vienen de la BD de PHP
  const [paciente, setPaciente] = useState(null);
  const [cargando, setCargando] = useState(true);

  // Estado para los campos nuevos que llenará el médico
  const [certificado, setCertificado] = useState({
    diagnostico: "",
    diasReposo: 0,
    fechaInicio: "",
    fechaFin: "",
    observaciones: ""
  });

  // Cargar datos del paciente mediante Axios al iniciar
  useEffect(() => {
    async function cargarDatos() {
      try {
        const respuesta = await obtenerPaciente(idPaciente);
        setPaciente(respuesta.data); // Axios guarda la respuesta en .data
      } catch (error) {
        console.error("Error al traer el paciente de PHP:", error);
      } finally {
        setCargando(false);
      }
    }
    if (idPaciente) cargarDatos();
  }, [idPaciente]);

  // Manejador para los cambios en los inputs nuevos
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCertificado((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  // Función de envío conectada a crearCertificado
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Estructuramos el objeto JSON tal como lo espera tu backend
    const datosParaEnviar = {
      idp: idPaciente,
      diagnostico: certificado.diagnostico,
      diasReposo: certificado.diasReposo,
      fechaInicio: certificado.fechaInicio,
      fechaFin: certificado.fechaFin,
      observaciones: certificado.observaciones
    };

    try {
      // Tu servicio mete esto en un FormData stringificado bajo la clave 'json'
      await crearCertificado(datosParaEnviar);
      alert("¡Certificado guardado con éxito en la base de datos!");
      
      // Limpiamos el formulario para un nuevo registro
      setCertificado({
        diagnostico: "",
        diasReposo: 0,
        fechaInicio: "",
        fechaFin: "",
        observaciones: ""
      });
    } catch (error) {
      console.error("Error al guardar el certificado:", error);
      alert("Hubo un error al intentar guardar el certificado.");
    }
  };

  if (cargando) return <div className="text-center p-5">Cargando datos del paciente...</div>;
  if (!paciente) return <div className="alert alert-danger">No se encontró el paciente.</div>;

  return (
    <div className="card shadow-sm p-4" style={{ backgroundColor: "#ffffff", color: "#333333" }}>
      <h2 className="mb-4 text-primary border-bottom pb-2">Generar Certificado Médico</h2>

      <form onSubmit={handleSubmit}>
        
        {/* SECCIÓN 1: DATOS DEL PACIENTE (SOLO LECTURA) */}
        <div className="bg-light p-3 rounded mb-4 row">
          <h5 className="text-secondary col-12 mb-3">Información del Paciente</h5>
          <div className="col-md-6 mb-2">
            <label className="form-label">Nombre Completo:</label>
            <input type="text" className="form-control bg-white" value={`${paciente.nombre || ''} ${paciente.apellido || ''}`} readOnly />
          </div>
          <div className="col-md-6 mb-2">
            <label className="form-label">Edad:</label>
            <input type="text" className="form-control bg-white" value={`${paciente.edad || 'N/A'} años`} readOnly />
          </div>
        </div>

        {/* SECCIÓN 2: CAMPOS DEL CERTIFICADO (PARA LLENAR) */}
        <div className="row">
          <h5 className="text-secondary col-12 mb-3">Detalles de la Condición Médica</h5>
          
          <div className="col-12 mb-3">
            <label className="form-label fw-bold">Diagnóstico Clínico:</label>
            <textarea 
              className="form-control" 
              name="diagnostico"
              rows="3" 
              placeholder="Escriba el diagnóstico detallado..."
              value={certificado.diagnostico}
              onChange={handleChange}
              required
            ></textarea>
          </div>

          <div className="col-md-4 mb-3">
            <label className="form-label fw-bold">Días de Reposo:</label>
            <input 
              type="number" 
              className="form-control" 
              name="diasReposo"
              min="0"
              value={certificado.diasReposo}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-md-4 mb-3">
            <label className="form-label fw-bold">Fecha de Inicio:</label>
            <input 
              type="date" 
              className="form-control" 
              name="fechaInicio"
              value={certificado.fechaInicio}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-md-4 mb-3">
            <label className="form-label fw-bold">Fecha de Fin:</label>
            <input 
              type="date" 
              className="form-control" 
              name="fechaFin"
              value={certificado.fechaFin}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-12 mb-4">
            <label className="form-label fw-bold">Indicaciones / Observaciones Adicionales:</label>
            <textarea 
              className="form-control" 
              name="observaciones"
              rows="2" 
              placeholder="Medicamentos, cuidados especiales, etc."
              value={certificado.observaciones}
              onChange={handleChange}
            ></textarea>
          </div>
        </div>

        {/* BOTÓN DE ACCIÓN */}
        <div className="d-flex justify-content-end gap-2">
          <button type="submit" className="btn btn-success btn-lg px-5">
            Guardar Certificado
          </button>
        </div>

      </form>
    </div>
  );
}

export default CrearCertificado;