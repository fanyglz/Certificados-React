import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/authService";

function Login() {
  const navigate = useNavigate();

  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const [mostrarPassword, setMostrarPassword] = useState(false);
  const [cargando, setCargando] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setCargando(true);

    try {
      const response = await login(usuario, password);

      if (response.Status === "Success") {
        localStorage.setItem("usuario", JSON.stringify(response.Data));
        navigate("/admin");
      } else {
        alert(response.Message || "Credenciales incorrectas");
      }
    } catch (error) {
      console.error("Error en el login:", error);
      alert("Hubo un error al conectar con el servidor.");
    } finally {
      setCargando(false);
    }
  };

  // Diccionario de estilos inline idénticos a la interfaz de tu imagen
  const styles = {
    wrapper: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      backgroundColor: '#f4f6f9',
      padding: '20px',
      fontFamily: '"Segoe UI", Roboto, Helvetica, Arial, sans-serif'
    },
    card: {
      backgroundColor: '#ffffff',
      padding: '40px 35px',
      borderRadius: '16px',
      boxShadow: '0 10px 25px rgba(0, 0, 0, 0.05)',
      width: '100%',
      maxWidth: '440px',
      textAlign: 'center',
      boxSizing: 'border-box'
    },
    logoContainer: {
      marginBottom: '25px',
      display: 'flex',
      justifyContent: 'center'
    },
    logoImg: {
      height: '45px',
      objectFit: 'contain'
    },
    h1: {
      color: '#002f6c',
      fontSize: '24px',
      fontWeight: '700',
      margin: '0 0 8px 0'
    },
    subtitle: {
      color: '#708090',
      fontSize: '14px',
      lineHeight: '1.5',
      margin: '0 0 30px 0'
    },
    form: {
      textAlign: 'left'
    },
    inputGroup: {
      marginBottom: '20px'
    },
    label: {
      display: 'block',
      color: '#6c7a89',
      fontSize: '11px',
      fontWeight: '700',
      textTransform: 'uppercase',
      letterSpacing: '0.5px',
      marginBottom: '8px'
    },
    inputWrapper: {
      position: 'relative',
      display: 'flex',
      alignItems: 'center'
    },
    input: {
      width: '100%',
      padding: '14px 14px 14px 45px',
      fontSize: '15px',
      borderRadius: '8px',
      border: '1px solid #dbe2e8',
      color: '#333333',
      outline: 'none',
      backgroundColor: '#ffffff',
      boxSizing: 'border-box',
      transition: 'border-color 0.2s'
    },
    iconLeft: {
      position: 'absolute',
      left: '15px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    iconRight: {
      position: 'absolute',
      right: '15px',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      userSelect: 'none'
    },
    btn: {
      width: '100%',
      backgroundColor: '#D50000',
      color: '#ffffff',
      border: 'none',
      padding: '15px',
      borderRadius: '8px',
      fontSize: '14px',
      fontWeight: '700',
      textTransform: 'uppercase',
      letterSpacing: '0.5px',
      cursor: 'pointer',
      marginTop: '10px',
      boxShadow: '0 4px 12px rgba(213, 0, 0, 0.2), inset 0 -2px 0 rgba(0,0,0,0.1)',
      transition: 'background-color 0.2s'
    },
    forgotLink: {
      display: 'block',
      textAlign: 'center',
      color: '#D50000',
      textDecoration: 'none',
      fontSize: '13px',
      fontWeight: '700',
      marginTop: '25px',
      cursor: 'pointer'
    },
    copyrightContainer: {
      marginTop: '35px',
      color: '#9aa0a6',
      fontSize: '12px',
      lineHeight: '1.6'
    },
    smallText: {
      margin: '2px 0 0 0',
      fontSize: '11px'
    }
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.card}>
        
        {/* LOGO INSTITUCIONAL */}
        <div style={styles.logoContainer}>
          <img 
            src="/certificados/Images/Emblemahorizontal.png" 
            alt="Cruz Roja Mexicana - Delegación Estatal Puebla" 
            style={styles.logoImg} 
          />
        </div>

        {/* ENCABEZADOS TEXTUALES */}
        <div>
          <h1 style={styles.h1}>Certificados Medicos</h1>
          <p style={styles.subtitle}>
            Sistema de Gestión - Certificados Medicos<br />
            Cruz Roja Mexicana
          </p>
        </div>

        {/* FORMULARIO DE ACCESO */}
        <form style={styles.form} onSubmit={handleLogin}>
          
          {/* CAMPO: CORREO INSTITUCIONAL */}
          <div style={styles.inputGroup}>
            <label style={styles.label}>Correo Institucional</label>
            <div style={styles.inputWrapper}>
              <span style={styles.iconLeft}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#D50000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
              </span>
              <input 
                type="text" 
                placeholder="Correo" 
                style={styles.input}
                value={usuario}
                onChange={(e) => setUsuario(e.target.value)}
                required
              />
            </div>
          </div>

          {/* CAMPO: CONTRASEÑA */}
          <div style={styles.inputGroup}>
            <label style={styles.label}>Contraseña</label>
            <div style={styles.inputWrapper}>
              <span style={styles.iconLeft}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#D50000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                </svg>
              </span>
              <input 
                type={mostrarPassword ? "text" : "password"} 
                placeholder="........" 
                style={styles.input}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              
              <input 
                type="checkbox" 
                id="toggle_pwd" 
                style={{ display: 'none' }} 
                checked={mostrarPassword}
                onChange={(e) => setMostrarPassword(e.target.checked)}
              />
              
              {/* OJO PARA MOSTRAR/OCULTAR CONTRASEÑA */}
              <label htmlFor="toggle_pwd" style={styles.iconRight}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={mostrarPassword ? "#D50000" : "#999"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                  <circle cx="12" cy="12" r="3"></circle>
                </svg>
              </label>
            </div>
          </div>

          {/* BOTÓN DE ENVÍO */}
          <button type="submit" style={styles.btn} disabled={cargando}>
            {cargando ? "Verificando..." : "Ingresar al Sistema"}
          </button>

          {/* LINK DE RECUPERACIÓN */}
          <a 
            href="#" 
            style={styles.forgotLink} 
            onClick={(e) => { e.preventDefault(); alert("Por favor, acude con el Administrador de Sistemas para restablecer tus accesos."); }}
          >
            ¿Olvidaste tu contraseña?
          </a>
        </form>

        {/* PIE DE PÁGINA */}
        <div style={styles.copyrightContainer}>
          <p style={{ margin: 0 }}>© 2026 Cruz Roja Mexicana</p>
          <p style={styles.smallText}>Acceso restringido</p>
        </div>

      </div>
    </div>
  );
}

export default Login;