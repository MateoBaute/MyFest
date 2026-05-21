'use client'

export default function Intro({ onOpenModal }) {
    return (
        <div className="mt-4 space-y-4 rounded-3xl border border-slate-700 bg-slate-950/70 p-6 shadow-[0_18px_40px_rgba(15,23,42,0.28)] backdrop-blur-sm animate-slide-up">
            <h2 className="text-2xl font-bold text-slate-100">Introducción a tus listas</h2>
            <p className="text-slate-800">
                Aquí puedes crear y organizar tus listas de invitados para cada evento. El objetivo es ayudarte a planificar mejor quién asistirá,
                mantener un registro claro y asegurarte de que nada se te escape.
            </p>
            <div className="space-y-4 text-slate-800">
                <p className="font-semibold text-slate-100">Cómo crear una lista:</p>
                <div className="grid gap-3 md:grid-cols-3">
                    <div className="rounded-2xl border border-pink-100 bg-pink-50 p-4 shadow-sm">
                        <span className="block text-sm font-semibold text-pink-700">1. Nombra tu lista</span>
                        <p className="mt-2 text-sm text-slate-800">Elige un nombre claro para tu evento o lista de invitados.</p>
                    </div>
                    <div className="rounded-2xl border border-violet-100 bg-violet-50 p-4 shadow-sm">
                        <span className="block text-sm font-semibold text-violet-700">2. Añade invitados</span>
                        <p className="mt-2 text-sm text-slate-800">Incluye el nombre, cédula o DNI y una imagen de cada persona.</p>
                    </div>
                    <div className="rounded-2xl border border-cyan-100 bg-cyan-50 p-4 shadow-sm">
                        <span className="block text-sm font-semibold text-cyan-700">3. Revisa y guarda</span>
                        <p className="mt-2 text-sm text-slate-800">Verifica la lista y guarda para futuras ediciones.</p>
                    </div>
                </div>
            </div>
            <p className="text-slate-300">
                Usa esta sección para administrar todos tus eventos y llevar el control de tus invitados de forma sencilla.
            </p>
            <button onClick={onOpenModal} className="mt-4 rounded-2xl bg-gradient-to-r from-slate-700 to-indigo-600 px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-slate-800/40 transition hover:scale-[1.01] hover:shadow-slate-900/40">
                Crear mi lista
            </button>
        </div>
    )
}