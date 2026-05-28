'use client';
import { useState, useEffect } from "react";
import ModalGestionarFiesta from "./modalGestionarFiesta";
import { useGuests } from "@/app/context/GuestContext"

export default function Lista() {
    const [fiestas, setFiestas] = useState([]);
    const [selectedFiesta, setSelectedFiesta] = useState(null);
    const context = useGuests()

    const isLogged = context.logged;

    useEffect(() => {
        const fetchFiestas = async () => {
            const user = JSON.parse(sessionStorage.getItem("user"))
            const userId = user ? user.id : null;
            const response = await fetch('/api/mostrarFiesta', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ idUser: userId })
            });
            const data = await response.json();
            setFiestas(data.fiestas || []);
        };
        fetchFiestas();
    }, []);

    return (
        <div>
            {isLogged ? (

                <div className="mx-auto px-4 py-8">
                    <h3 className="mb-6 text-xl font-bold text-slate-200 text-center">Tus Fiestas Creadas</h3>

                    {fiestas.length === 0 ? (
                        <p className="text-center text-slate-400">No has creado ninguna fiesta aún. ¡Crea una para empezar a gestionar tus invitados!</p>
                    ) : (
                        <div className="flex flex-wrap justify-center gap-4 max-w-[1400px] mx-auto">
                            {fiestas.map((fiesta) => (
                                <div
                                    key={fiesta.id}
                                    className="w-[200px] animate-fadeIn group relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/50 p-5 shadow-lg backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-indigo-500/50 hover:bg-slate-900/80 hover:shadow-[0_10px_30px_rgba(99,102,241,0.15)]"
                                >
                                    <div className="absolute -inset-px bg-gradient-to-r from-indigo-500 to-fuchsia-500 opacity-0 blur transition duration-300 group-hover:opacity-10" />

                                    <div className="relative z-10 flex flex-col justify-between h-full space-y-3">
                                        <div>
                                            <h2 className="text-lg font-bold text-slate-100 transition duration-300 group-hover:text-indigo-400">
                                                {fiesta.name}
                                            </h2>

                                            <p className="mt-1 text-xs font-medium text-slate-400 flex items-center">
                                                <span className="mr-1.5 text-indigo-400">📅</span>
                                                {new Date(fiesta.date).toLocaleDateString('es-ES', {
                                                    day: '2-digit',
                                                    month: 'long',
                                                    year: 'numeric'
                                                })}
                                            </p>
                                        </div>

                                        <div className="pt-2">
                                            <button
                                                onClick={() => setSelectedFiesta(fiesta)}
                                                className="w-full rounded-xl bg-slate-800/80 py-2 text-xs font-semibold text-slate-300 transition hover:bg-indigo-600 hover:text-white"
                                            >
                                                Gestionar lista
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {selectedFiesta && (
                        <ModalGestionarFiesta
                            fiesta={selectedFiesta}
                            onClose={() => setSelectedFiesta(null)}
                        />
                    )}
                </div>
            ) : (
                <div className="mx-auto max-w-xl px-4 py-7 border border-slate-700 bg-slate-950/70 rounded-3xl shadow-[0_18px_40px_rgba(15,23,42,0.28)] backdrop-blur-sm animate-slide-up">
                    <p className="text-center text-slate-400 text-lg" >¡Debes iniciar sesion para poder crear listas!</p>
                </div>
            )}
        </div>
    );
}
