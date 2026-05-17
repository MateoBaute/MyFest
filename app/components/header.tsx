"use client";

import Link from "next/link";
import { useGuests } from "@/app/context/GuestContext";

export default function Header() {
  const { logged, logout } = useGuests();

  return (
    <header className="bg-blue-600 text-white p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">MyFest 🥳</h1>
      <nav>
        <ul className="flex gap-4">
          <li><Link href="/">Inicio</Link></li>
          <li><Link href="/listas">Mis Listas</Link ></li>
          {!logged ? (
            <li><Link href="/login">Login</Link></li>
          ) : (
            <li><button onClick={logout}>cerrar sesión</button></li>
          )}
        </ul>
      </nav>
    </header>
  );
}