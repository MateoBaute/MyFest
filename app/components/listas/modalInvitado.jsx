'use client'
import { createPortal } from "react-dom";
import { useEffect, useState } from "react";

export default function ModalInvitado({ onClose, invitado }) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => { setMounted(true); }, []);

    async function eliminarInvitado() {
        if (!confirm("¿Estás seguro de eliminar este invitado?")) return;
        try {
            // CORRECCIÓN: 'body' va afuera de 'headers'
            const res = await fetch(`/api/eliminarInvitado`, {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id: invitado.id })
            });
            const data = await res.json();
            if (data.success) {
                alert("Invitado eliminado con éxito");
                onClose();
            } else {
                alert("No se pudo eliminar: " + (data.message || "Error desconocido"));
            }
        } catch (error) {
            alert("Error al eliminar el invitado: " + error);
        }
    }

    if (!mounted) return null;

    return createPortal(
        <div onClick={(e) => { e.stopPropagation(); onClose(); }} className="fixed inset-0 bg-black/50 w-full h-full flex items-center justify-center z-50 p-4">
            <div onClick={(e) => e.stopPropagation()} className="bg-slate-900 border border-slate-700/50 rounded-xl p-6 animate-fadeIn overflow-y-auto max-w-[400px]">
                <div className="flex flex-col max-w-[400px] items-center gap-4 text-center">

                    <div className="relative h-48 w-48 rounded-xl overflow-hidden ring-4 ring-indigo-500/30 shrink-0">
                        <img
                            src={invitado.imagen}
                            alt={invitado.name}
                            className="h-full w-full object-cover object-center"
                        />
                    </div>

                    <div className="mt-2">
                        <h2 className="text-xl font-semibold text-slate-200 break-words max-w-[320px]">{invitado.name}</h2>
                        <p className="text-sm text-slate-400 mt-1 font-mono">DNI: {invitado.dni}</p>
                    </div>
                </div>

                
                <div className="mt-6 flex justify-center">
                    <button onClick={eliminarInvitado} className="w-full sm:w-auto px-6 py-2.5 bg-red-600/90 text-white font-medium rounded-lg hover:bg-red-700 transition-colors shadow-lg shadow-red-900/20">
                        Eliminar Invitado
                    </button>
                </div>
            </div>
        </div>,document.body

    );
}
