"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import ModalInvitado from "./modalInvitado";

export default function ModalGestionarFiesta({ fiesta, onClose }) {
    const [agregarInvitado, setAgregarInvitado] = useState(false);
    const [nombre, setNombre] = useState("");
    const [dni, setDni] = useState("");
    const [imagen, setImagen] = useState(null);
    const [preview, setPreview] = useState(null);
    const [invitados, setInvitados] = useState([]);
    const [mostrarInvitado, setMostrarInvitado] = useState(false);
    const [invitadoSeleccionado, setInvitadoSeleccionado] = useState(null);
    const [dniBusqueda, setDniBusqueda] = useState("");

    useEffect(() => {
        if (!fiesta) return;

        buscarInvitados(fiesta.id);
        setAgregarInvitado(false);
        setMostrarInvitado(false);
        setInvitadoSeleccionado(null);

        const originalOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";

        return () => {
            document.body.style.overflow = originalOverflow;
        };
    }, [fiesta]);

    const handleImageChange = (e) => {
        const file = e.target.files?.[0];
        setImagen(file);
        if (file) {
            setPreview(URL.createObjectURL(file));
        }
    };

    const guardarInvitado = async () => {
        try {
            let imagePath = null;

            if (imagen) {
                const formData = new FormData();
                formData.append("image", imagen);

                const uploadRes = await fetch("/api/upload", {
                    method: "POST",
                    body: formData,
                });
                const uploadData = await uploadRes.json();
                imagePath = uploadData.path;
            }

            const res = await fetch("/api/invitados", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: nombre,
                    dni,
                    imagen: imagePath,
                    idFiesta: fiesta.id,
                }),
            });

            const data = await res.json();
            if (data.success) {
                setNombre("");
                setDni("");
                setImagen(null);
                setPreview(null);
                setAgregarInvitado(false);
                buscarInvitados(fiesta.id);
            } else {
                alert("No se pudo guardar el invitado: " + (data.error || "Error desconocido"));
            }
        } catch (error) {
            console.error("Error guardando invitado:", error);
            alert("Error al guardar el invitado");
        }
    };

    async function buscarInvitados(id) {
        try {
            const response = await fetch("/api/buscarInvitados", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ idFiesta: id }),
            });
            const data = await response.json();
            if (data.success) {
                setInvitados(data.invitados || []);
            }
        } catch (error) {
            console.error("Error buscando invitados:", error);
        }
    }

    const filtroInvitado = async () => {
        try {
            if (!fiesta) return;
            const query = dniBusqueda.trim();
            if (query === "") {
                await buscarInvitados(fiesta.id);
                return;
            }

            const response = await fetch("/api/buscarInvitadosFiltro", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ idFiesta: fiesta.id, query }),
            });
            const data = await response.json();
            if (data.success) {
                setInvitados(data.invitados || []);
            }
        } catch (error) {
            console.error("Error filtrando invitados:", error);
        }
    };

    const cerrarInvitado = () => {
        setMostrarInvitado(false);
        setInvitadoSeleccionado(null);
    };

    return createPortal(
        <div onClick={onClose} className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 backdrop-blur-sm p-4">
            {fiesta ? (
                <div onClick={(e) => e.stopPropagation()} className="w-full max-w-[95vw] sm:max-w-md max-h-[90vh] overflow-y-auto flex flex-col rounded-[32px] bg-slate-950/95 p-4 sm:p-6 shadow-[0_30px_90px_rgba(15,23,42,0.28)] ring-1 ring-slate-700 animate-scaleIn">
                    <h2 className="mb-4 text-2xl font-bold text-slate-100 text-center">{fiesta.name}</h2>
                    <p className="text-slate-300 text-center">Aquí podrás gestionar tu fiesta.</p>
                    <label className="mt-4 block text-sm font-medium text-slate-300">Fecha de la fiesta:</label>
                    <p className="text-slate-400">{new Date(fiesta.date).toLocaleDateString('es-ES', {
                        day: '2-digit',
                        month: 'long',
                        year: 'numeric',
                    })}</p>

                    <div className="m-auto mt-5">
                        <button onClick={() => setAgregarInvitado(!agregarInvitado)} className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
                            {agregarInvitado ? "Cancelar" : "Agregar Invitado"}
                        </button>
                    </div>

                    {agregarInvitado && (
                        <div className="mt-4 flex flex-col w-full bg-slate-800 border border-slate-600 rounded-lg mx-auto p-4 gap-2">
                            <label className="text-slate-300 text-sm">Nombre del invitado:</label>
                            <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} className="rounded-lg p-2 bg-slate-700 text-slate-300 placeholder:text-slate-500 border border-slate-600" />

                            <label className="text-slate-300 text-sm">Cédula o DNI:</label>
                            <input type="text" value={dni} onChange={(e) => setDni(e.target.value)} className="rounded-lg p-2 bg-slate-700 text-slate-300 placeholder:text-slate-500 border border-slate-600" placeholder="Cédula o DNI" />

                            <label className="text-slate-300 text-sm">Imagen del invitado:</label>
                            <input type="file" accept="image/*" onChange={handleImageChange} className="rounded-lg p-2 bg-slate-700 text-slate-300 border border-slate-600" />

                            {preview && (<img src={preview} alt="Preview" className="mt-2 h-24 w-24 rounded-full object-cover mx-auto border-2 border-indigo-500" />)}

                            <button onClick={guardarInvitado} className="mt-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                                Guardar Invitado
                            </button>
                        </div>
                    )}

                    <p className="mt-4 text-white text-sm">Buscar Invitado por DNI o nombre</p>
                    <div className="flex flex-col gap-2 w-full sm:flex-row">
                        <input
                            type="text"
                            value={dniBusqueda}
                            onChange={(e) => {setDniBusqueda(e.target.value); filtroInvitado();}}
                            className="flex-1 rounded-lg bg-slate-700 text-slate-300 placeholder:text-slate-500 border border-slate-600 px-3 py-2"
                            placeholder="Ingrese el DNI o nombre del invitado"
                        />
                        <div className="flex gap-2">
                            <button type="button" onClick={() => { setDniBusqueda(""); buscarInvitados(fiesta.id); }} className="rounded-lg bg-slate-700 px-4 py-2 text-slate-200 hover:bg-slate-600 transition-colors">
                                Limpiar
                            </button>
                        </div>
                    </div>

                    <div className="flex flex-col w-full bg-slate-900/50 backdrop-blur-md border border-slate-700/60 mt-5 rounded-2xl mx-auto overflow-hidden shadow-inner max-h-[450px]">
                        {invitados && invitados.length > 0 ? (
                            <div className="flex flex-col p-3 gap-1 overflow-y-auto max-h-[450px] scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-slate-700 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-slate-600">
                                {invitados.map((invitado) => (
                                    <button
                                        type="button"
                                        key={invitado.id}
                                        onClick={() => { setMostrarInvitado(true); setInvitadoSeleccionado(invitado); }}
                                        className="mt-1 border border-slate-600 flex items-center gap-4 p-3 rounded-xl hover:bg-slate-800/60 transition-all duration-200 group text-left"
                                    >
                                        <div className="relative h-12 w-12 rounded-full overflow-hidden ring-2 ring-indigo-500/30 group-hover:ring-indigo-500 transition-all duration-200 shrink-0">
                                            <img src={invitado.imagen} alt={invitado.name} className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-200" />
                                        </div>
                                        <div className="flex flex-col min-w-0 flex-1">
                                            <span className="font-medium text-slate-200 tracking-wide truncate group-hover:text-white transition-colors">{invitado.name}</span>
                                            <span className="text-slate-400 text-xs font-mono mt-0.5 tracking-wider">DNI: {invitado.dni}</span>
                                        </div>
                                        <span className="p-1 text-xs bg-slate-800 text-slate-400 font-medium px-2.5 py-1 rounded-lg group-hover:bg-indigo-500/10 group-hover:text-indigo-400 transition-colors hidden sm:inline-block">Invitado</span>
                                    </button>
                                ))}
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center flex-1 py-8 px-4 text-center animate-fadeIn">
                                <div className="h-10 w-10 rounded-full bg-slate-800/80 flex items-center justify-center text-slate-500 mb-3 ring-4 ring-slate-900/30">👥</div>
                                <p className="text-slate-400 font-medium text-sm">Lista de invitados vacía</p>
                                <p className="text-slate-500 text-xs mt-1 max-w-[200px]">Aún no has registrado asistentes para este evento.</p>
                            </div>
                        )}
                    </div>
                </div>
            ) : null}

            {mostrarInvitado ? (<ModalInvitado onClose={cerrarInvitado} invitado={invitadoSeleccionado} />) : null}
        </div>,
        document.body
    );
}
