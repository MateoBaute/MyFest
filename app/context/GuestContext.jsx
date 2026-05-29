"use client";

import { createContext, useContext, useState, useEffect } from "react";

// Crear el contexto
const GuestContext = createContext(null);

// Provider
export function GuestProvider({ children }) {
  const [logged, setLogged] = useState(false);


  useEffect(() => {
    const savedToken = sessionStorage.getItem("token");

    if (savedToken) {
      setLogged(true);
    }
  }, []);

  

  const logout = () => {

    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");
    setLogged(false);
  };

  return (
    <GuestContext.Provider value={{ logged, setLogged, logout }}>
      {children}
    </GuestContext.Provider>
  );
}

// Hook personalizado
export function useGuests() {
  const context = useContext(GuestContext);
  if (!context) throw new Error("useGuests debe usarse dentro de GuestProvider");
  return context;
}