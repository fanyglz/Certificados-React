import TopBar from "../components/TopBar";
import { useState, useEffect } from "react";

function RegistrarPaciente() {
  const [formData, setFormData] = useState({
    nombre: "",
    apellido_paterno: "",
    apellido_materno: "",
    fecha_nacimiento: "",
    edad: "",
    sexo: "",
    curp: "",
    celular: "",
    email: "",
    direccion: "",
  });

  // Manejador para actualizar el estado cuando el usuario escribe
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // PASO 1: Cálculo automático de la edad basado en tu lógica original
  useEffect(() => {
    if (!formData.fecha_nacimiento) {
      setFormData((prev) => ({ ...prev, edad: "" }));
      return;
    }

    const fechaNacimiento = new Date(formData.fecha_nacimiento);
    const hoy = new Date();

    let edad = hoy.getFullYear() - fechaNacimiento.getFullYear();
    const mes = hoy.getMonth() - fechaNacimiento.getMonth();

    if (mes < 0 || (mes === 0 && hoy.getDate() < fechaNacimiento.getDate())) {
      edad--;
    }

    setFormData((prev) => ({
      ...prev,
      edad: edad >= 0 ? edad : "",
    }));
  }, [formData.fecha_nacimiento]);

  // PASO 2: Validación de campos (Migrada desde validarCamposPaciente de jQuery)
  const validarPaciente = () => {
    if (formData.nombre.trim() === "") {
      alert("Por favor, ingresa el nombre(s).");
      return false;
    }

    if (formData.apellido_paterno.trim() === "") {
      alert("Por favor, ingrese el apellido patorno.");
      return false;
    }

    if (formData.apellido_materno.trim() === "") {
      alert("Por favor, ingrese el apellido materno.");
      return false;
    }

    if (formData.sexo === "") {
      alert("Por favor, selecciona el sexo.");
      return false;
    }

    if (formData.fecha_nacimiento === "") {
      alert("Por favor, selecciona la fecha de nacimiento.");
      return false;
    }

    // Validar que la edad máxima no supere los 120 años
    if (Number(formData.edad) > 120) {
      alert("La edad no puede ser mayor a 120 años.");
      return false;
    }

    if (formData.curp.trim() === "") {
      alert("Por favor, ingrese la CURP.");
      return false;
    }

    if (formData.curp.trim().length !== 18) {
      alert("La CURP debe tener exactamente 18 caracteres.");
      return false;
    }

    if (formData.direccion.trim() === "") {
      alert("Por favor, ingrese la dirección.");
      return false;
    }

    // Filtro básico antispam de tu archivo original
    if (["aaa", "xxx", "test", "prueba", "asdf"].includes(formData.direccion.trim().toLowerCase())) {
      alert("La dirección ingresada no parece válida.");
      return false;
    }

    if (formData.celular !== "" && formData.celular.length < 10) {
      alert("El número de celular debe tener al menos 10 dígitos.");
      return false;
    }

    const formEmail = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (formData.email !== "" && !formEmail.test(formData.email)) {
      alert("El correo electrónico no es válido.");
      return false;
    }

    return true;
  };

  // Función manejadora del envío del formulario
  const handleSubmit = () => {
    if (validarPaciente()) {
      alert("¡Validación correcta! El paciente está listo para enviarse a PHP.");
      // Aquí conectaremos próximamente el pacienteService.js
    }
  };

  return (
    <div>
      <TopBar titulo="Registro de Pacientes" />

      <div className="form-card">
        <div className="form-header">
          <div className="form-title">Nuevo Expediente</div>
        </div>

        <form className="modern-form">
          {/* DATOS PERSONALES */}
          <div className="form-section">
            <h4 className="section-title">Datos Personales</h4>

            <div className="form-grid">
              <div className="input-group">
                <label htmlFor="nombre">
                  Nombre(s) <span className="red">*</span>
                </label>
                <input
                  type="text"
                  id="nombre"
                  name="nombre"
                  maxLength={30}
                  className="form-input"
                  value={formData.nombre}
                  onChange={handleChange}
                />
              </div>

              <div className="input-group">
                <label htmlFor="apellido_paterno">
                  Apellido Paterno <span className="red">*</span>
                </label>
                <input
                  type="text"
                  id="apellido_paterno"
                  name="apellido_paterno"
                  maxLength={30}
                  className="form-input"
                  value={formData.apellido_paterno}
                  onChange={handleChange}
                />
              </div>

              <div className="input-group">
                <label htmlFor="apellido_materno">
                  Apellido Materno <span className="red">*</span>
                </label>
                <input
                  type="text"
                  id="apellido_materno"
                  name="apellido_materno"
                  maxLength={30}
                  className="form-input"
                  value={formData.apellido_materno}
                  onChange={handleChange}
                />
              </div>

              <div className="input-group">
                <label htmlFor="fecha_nacimiento">
                  Fecha de Nacimiento <span className="red">*</span>
                </label>
                <input
                  type="date"
                  id="fecha_nacimiento"
                  name="fecha_nacimiento"
                  className="form-input"
                  max={new Date().toISOString().split("T")[0]} // Limita a fecha actual
                  value={formData.fecha_nacimiento}
                  onChange={handleChange}
                />
              </div>

              <div className="input-group">
                <label htmlFor="edad">Edad</label>
                <input
                  type="number"
                  id="edad"
                  name="edad"
                  className="form-input readonly-input"
                  value={formData.edad}
                  readOnly
                />
              </div>

              <div className="input-group">
                <label htmlFor="sexo">
                  Sexo <span className="red">*</span>
                </label>
                <select
                  id="sexo"
                  name="sexo"
                  className="form-input modern-select"
                  value={formData.sexo}
                  onChange={handleChange}
                >
                  <option value="">Seleccione...</option>
                  <option value="MASCULINO">MASCULINO</option>
                  <option value="FEMENINO">FEMENINO</option>
                </select>
              </div>

              <div className="input-group span-2">
                <label htmlFor="curp">
                  CURP <span className="red">*</span>
                </label>
                <input
                  type="text"
                  id="curp"
                  name="curp"
                  maxLength={18}
                  className="form-input"
                  value={formData.curp}
                  onChange={handleChange}
                />
                <a
                  href="https://www.gob.mx/curp/"
                  target="_blank"
                  rel="noreferrer"
                  className="link-curp"
                >
                  ¿No conoces tu CURP? Consúltala aquí.
                </a>
              </div>
            </div>
          </div>

          {/* DATOS DE CONTACTO */}
          <div className="form-section">
            <h4 className="section-title">Datos de Contacto</h4>

            <div className="form-grid">
              <div className="input-group">
                <label htmlFor="celular">Número de celular</label>
                <input
                  type="text"
                  id="celular"
                  name="celular"
                  className="form-input"
                  maxLength={10}
                  value={formData.celular}
                  onChange={handleChange}
                />
              </div>

              <div className="input-group">
                <label htmlFor="email">Correo electrónico</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="form-input"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>

              <div className="input-group span-2">
                <label htmlFor="direccion">
                  Dirección <span className="red">*</span>
                </label>
                <input
                  type="text"
                  id="direccion"
                  name="direccion"
                  className="form-input"
                  value={formData.direccion}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          {/* BOTÓN */}
          <div className="form-actions">
            <p className="required-note">
              <span className="red">*</span> Campos Obligatorios
            </p>
            <button
              type="button"
              className="btn-primary"
              onClick={handleSubmit}
            >
              REGISTRAR PACIENTE
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RegistrarPaciente;