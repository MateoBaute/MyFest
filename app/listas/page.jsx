'use client'

import Listas from "@/app/components/listas/lista";
import Intro from "@/app/components/listas/intro";
import ModalCrearRutina from "@/app/components/listas/modalCrearFiesta";
import { useState } from "react";

export default function ListasPage() {
  const [showModal, setShowModal] = useState(false);

  const handleCreateFiesta = () => {
    setShowModal(true);
  };

  const closeCreateFiesta = () => {
    setShowModal(false);
  }

  return (
    <div className="page-fade-in space-y-8">
      <section className="slide-up rounded-3xl border border-slate-700 bg-slate-950/70 p-6 shadow-[0_30px_80px_rgba(15,23,42,0.28)] backdrop-blur-sm">
        <h2 className="text-3xl font-extrabold tracking-tight text-slate-100 mb-2">Mis Listas</h2>
        <p className="text-slate-300">Aquí podrás ver y gestionar tus listas de invitados con animaciones suaves y una interfaz más clara.</p>
      </section>
      <Intro onOpenModal={handleCreateFiesta} />
      <Listas />
      {showModal && <ModalCrearRutina onClose={closeCreateFiesta} />}
    </div>
  );
}
