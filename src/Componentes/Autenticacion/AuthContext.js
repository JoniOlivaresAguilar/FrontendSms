import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // Solo cargar datos del localStorage al iniciar
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");

    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      setToken(storedToken);
    }
    setLoading(false);
  }, []);

  const login = (userData, authToken) => {
    console.log('Login en AuthContext:', userData);
    
    const userToStore = { 
      id_usuarios: userData.id_usuarios,
      Nombre: userData.Nombre,
      ApellidoP: userData.ApellidoP,
      ApellidoM: userData.ApellidoM,
      Correo: userData.Correo,
      Telefono: userData.Telefono,
      PreguntaSecreta: userData.PreguntaSecreta,
      RespuestaSecreta: userData.RespuestaSecreta,
      TipoUsuario: userData.TipoUsuario,
      Estado: userData.Estado
    };
    
    setUser(userToStore);
    setToken(authToken);
    localStorage.setItem("user", JSON.stringify(userToStore));
    localStorage.setItem("token", authToken);
    
    // NO redirigimos desde aquí, se hará desde el componente
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
};