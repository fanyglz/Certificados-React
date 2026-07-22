import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Inicializamos recuperando los datos de forma segura
  const [usuario, setUsuario] = useState(() => {
    try {
      const userSaved = localStorage.getItem("usuario");
      if (!userSaved || userSaved === "undefined") {
        return null;
      }
      return JSON.parse(userSaved);
    } catch (error) {
      console.error("Error al leer el usuario del localStorage:", error);
      localStorage.removeItem("usuario"); // Limpiamos el localStorage corrupto
      return null;
    }
  });

  const login = (datosUsuario) => {
    try {
      setUsuario(datosUsuario);
      localStorage.setItem("usuario", JSON.stringify(datosUsuario));
    } catch (error) {
      console.error("Error al guardar la sesión:", error);
    }
  };

  const logout = () => {
    setUsuario(null);
    localStorage.removeItem("usuario");
  };

  return (
    <AuthContext.Provider value={{ usuario, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe ser usado dentro de un AuthProvider");
  }
  return context;
};