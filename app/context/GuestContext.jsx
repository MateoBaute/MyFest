"use client";

import { createContext, useContext, useState, useEffect } from "react";

// Crear el contexto
const GuestContext = createContext(null);

// Provider
export function GuestProvider({ children }) {
  const [logged, setLogged] = useState(false);
  const [guest, setGuest] = useState(null);

  useEffect(() => {
    const savedGuest = localStorage.getItem("guest");
    const savedToken = localStorage.getItem("token");

    if (savedGuest && savedToken) {
      setGuest(JSON.parse(savedGuest));
      setLogged(true);
    }
  }, []);

  useEffect(() => {
    if (guest) {
      localStorage.setItem("guest", JSON.stringify(guest));
    }
  }, [guest]);

  const logout = () => {
    localStorage.removeItem("guest");
    localStorage.removeItem("token");
    setGuest(null);
    setLogged(false);
  };

  return (
    <GuestContext.Provider value={{ guest, setGuest, logged, setLogged, logout }}>
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