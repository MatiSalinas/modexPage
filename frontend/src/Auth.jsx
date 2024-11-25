import { createContext, useContext, useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
const AuthContext = createContext();

import PersonIcon from '@mui/icons-material/Person';
import {Button } from "@mui/material";
// Hook con sesion
export const useAuth = () => {
  return useContext(AuthContext);
};

// Componente principal
export const AuthProvider = ({ children }) => {
  const [sesion, setSesion] = useState(null);

  const login = async (username, password, ok, error) => {
    const response = await fetch("http://localhost:3000/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    if (!response.ok) {
      error();
      return;
    }
    const sesion = await response.json();
    //console.log(sesion);
    setSesion(sesion);
    ok();
  };

  const logout = (ok) => {
    setSesion(null);
    ok();
  };

  const value = { sesion, login, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Autorizar pagina
export const AuthPage = ({ children }) => {
  const { sesion } = useAuth();
  const location = useLocation();

  if (!sesion) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

// Autorizar rol
export const AuthRol = ({ rol, children }) => {
  const { sesion } = useAuth();

  if (!sesion || sesion.rol !== rol) {
    return null;
  }

  return children;
};


export const AuthStatus = () => {
  const { sesion, logout } = useAuth();
  const navigate = useNavigate();

  if (!sesion) {
    return <Button variant="contained" size="large" startIcon={<PersonIcon/>} sx={{ml: 2, backgroundColor: "#a111ad", borderRadius: "20px", objectFit: "contain"}}>Ingresar</Button>
  }

  return (
    <>
      <p>Conectado como {sesion.username}</p>
      <button onClick={() => logout(() => navigate("/"))}>Salir</button>
    </>
  );
};