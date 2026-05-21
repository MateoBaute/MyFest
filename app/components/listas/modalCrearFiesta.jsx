'use client'

import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'

export default function ModalCrearFiesta({ onClose }) {
    const [nombre, setNombre] = useState('')
    const [fecha, setFecha] = useState('')

    function formatearFecha(fecha) {
        if (!fecha) return ''
        const partes = fecha.split('-')
        const [yyyy, mm, dd] = partes
        return `${yyyy}/${mm}/${dd}`
    }

    async function crearFiesta() {
        try {
            const fechaFormateada = formatearFecha(fecha)
            const idUser = JSON.parse(sessionStorage.getItem("user")).id
            const response = await fetch('/api/crearFiesta', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name: nombre, date: fechaFormateada, idUser: idUser }),
            })
            const data = await response.json()
            if (data.success) {
                alert("Fiesta creada con éxito")
                onClose();
            }else{
                alert("Error al crear la fiesta: " + (data.error || "Error desconocido"))
            }
        } catch (error) {
            console.error('Error al crear la fiesta:', error)
        }
    }

    useEffect(() => {
        function handleEsc(e) {
            if (e.key === 'Escape') {
                onClose()
            }
        }

        window.addEventListener('keydown', handleEsc)

        return () => {
            window.removeEventListener('keydown', handleEsc)
        }
    }, [onClose])

    return createPortal(
        <div onClick={onClose} className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 backdrop-blur-sm animate-fadeIn">
            <div onClick={(e) => e.stopPropagation()} className="w-full max-w-md rounded-[32px] bg-slate-950/95 p-6 shadow-[0_30px_90px_rgba(15,23,42,0.28)] ring-1 ring-slate-700 animate-scaleIn">
                <h2 className="mb-4 text-2xl font-bold text-slate-100">Crear nueva fiesta</h2>
                <div className="space-y-4">
                    <div>
                        <label htmlFor="nombre" className="block text-sm font-medium text-slate-300">Nombre de la fiesta</label>
                        <input type="text" id="nombre" name="nombre" className="text-slate-100 mt-1 w-full rounded-2xl border border-slate-700 bg-slate-900 p-3 shadow-sm transition focus:border-indigo-400 focus:ring focus:ring-indigo-400/30" placeholder="Ej: Fiesta de cumpleaños" value={nombre} onChange={(e) => setNombre(e.target.value)} />
                    </div>
                    <div>
                        <label htmlFor="fecha" className="block text-sm font-medium text-gray-700">Fecha</label>
                        <input type="date" id="fecha" name="fecha" className="text-slate-100 mt-1 w-full rounded-2xl border border-slate-700 bg-slate-900 p-3 shadow-sm transition focus:border-indigo-400 focus:ring focus:ring-indigo-400/30" value={fecha} onChange={(e) => setFecha(e.target.value)} />
                    </div>
                    <div className="flex justify-end gap-3">
                        <button type="button" onClick={onClose} className="rounded-2xl bg-slate-800 px-4 py-2 text-sm font-medium text-slate-200 transition hover:bg-slate-700">Cancelar</button>
                        <button onClick={crearFiesta} className="rounded-2xl bg-gradient-to-r from-slate-700 to-indigo-600 px-4 py-2 text-sm font-semibold text-white transition hover:brightness-110">Crear</button>
                    </div>
                </div>
            </div>
        </div>, document.body
    )
}