"use client";

import Link from "next/link";
import { useGuests } from "@/app/context/GuestContext";

export default function Header() {
  const { logged, logout } = useGuests();

  return (
    <header className="header-glow text-white p-5 flex flex-col sm:flex-row justify-between items-center gap-4">
      <h1 className="text-2xl font-extrabold tracking-tight">MyFest</h1>
      <nav>
        <ul className="flex flex-wrap justify-center gap-4">
          <li><Link href="/" className="nav-link">Inicio</Link></li>
          <li><Link href="/listas" className="nav-link">Mis Listas</Link ></li>
          {!logged ? (
            <li><Link href="/login" className="nav-link">Login</Link></li>
          ) : (
            <li><button onClick={logout} className="nav-link">Cerrar sesión</button></li>
          )}
        </ul>
      </nav>
    </header>
  );
}