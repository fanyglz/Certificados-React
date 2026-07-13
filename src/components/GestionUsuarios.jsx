import React, { useState, useEffect } from 'react';
// Supongamos que aquí importas tu servicio ya preparado
import { crearCertificado } from '../services/certificadoService'; 

export const CrearCertificado = ({ idPaciente }) => {
  // 1. Estado para los campos del formulario (Signos vitales, evaluación, etc.)
  const [form, setForm] = useState({
    peso: "",
    talla: "",
    imc: "",
    pat: "",
    ale: "",
    toxi: ""
    // ... todos los demás campos del JSON anterior
  });

  // 2. Cargar datos del paciente al iniciar (Módulo 1)
  useEffect(() => {
    if (idPaciente) {
      // Aquí harías la llamada a tu API de PHP para traer la info del paciente
      // ej: obtenerPaciente(idPaciente).then(data => setPaciente(data));
    }
  }, [idPaciente]);

  // 3. Manejador de cambios genérico (reemplaza a los selectores de jQuery)
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value
    });
  };

  // 4. Lógica reutilizada (Modificada para React)
  const calcularIMC = () => {
    const { peso, talla } = form;
    if (peso && talla) {
      const imcCalculado = (peso / (talla * talla)).toFixed(2);
      setForm(prev => ({ ...prev, imc: imcCalculado }));
    }
  };

  // Ejecutar el cálculo de IMC automáticamente cuando cambie peso o talla
  useEffect(() => {
    calcularIMC();
  }, [form.peso, form.talla]);

  // 5. Función de envío (Módulo 4)
  const manejarEnvio = async (e) => {
    e.preventDefault();
    
    // Estructuramos el JSON tal como lo necesita tu backend en PHP
    const datosCertificado = {
      fech: obtenerFechaActual(),
      idp: idPaciente,
      peso: form.peso,
      talla: form.talla,
      imc: form.imc,
      pat: form.pat,
      ale: form.ale,
      toxi: form.toxi
      // ... los demás campos
    };

    try {
      await crearCertificado(datosCertificado);
      alert("¡Certificado creado con éxito!");
    } catch (error) {
      console.error("Error al crear:", error);
    }
  };

  return (
    <form onSubmit={manejarEnvio} className="p-4">
      <h2>Crear Certificado Médico</h2>
      
      {/* Módulo 2: Signos Vitales */}
      <div className="row mb-3">
        <div className="col">
          <label>Peso (kg)</label>
          <input 
            type="number" 
            name="peso" 
            className="form-control"
            value={form.peso} 
            onChange={handleChange} 
          />
        </div>
        <div className="col">
          <label>Talla (m)</label>
          <input 
            type="number" 
            name="talla" 
            className="form-control"
            value={form.talla} 
            onChange={handleChange} 
          />
        </div>
        <div className="col">
          <label>IMC</label>
          <input 
            type="text" 
            name="imc" 
            className="form-control" 
            value={form.imc} 
            disabled 
          />
        </div>
      </div>

      <button type="submit" className="btn btn-primary">
        Crear certificado
      </button>
    </form>
  );
};

// Tu función de fecha tal cual, fuera del componente porque es una función pura
function obtenerFechaActual() {
    var fechaActual = new Date();
    var meses = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];
    return fechaActual.getDate() + " de " + meses[fechaActual.getMonth()] + " de " + fechaActual.getFullYear();
}

export default CrearCertificado;
