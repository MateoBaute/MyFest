"use client";
import { useRouter } from "next/navigation";
import { useState, useContext } from "react";

export default function RegisterPage(){
    const router = useRouter();

    const [name, setName] = useState("")
    const [dni, setDni] = useState("")
    const [password, setPassword] = useState("")

    async function register(){
        try {
            const response = await fetch("/api/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name, dni, password }),
            });

            const data = await response.json();

            setName("");
            setDni("");
            setPassword("");
            router.push("/login");
        } catch (error) {
            console.error("Error al registrar:", error);
        }
    }

    return(
        <div className="flex items-center justify-center py-12">
            <section className="w-full max-w-md rounded-[32px] border border-slate-700 bg-slate-950/80 p-8 shadow-[0_30px_80px_rgba(15,23,42,0.28)] backdrop-blur-sm animate-fadeIn">
                <div className="mb-6 text-center">
                    <h2 className="text-3xl font-bold text-slate-100">Registrarse</h2>
                    <p className="mt-2 text-sm text-slate-400">
                        Crea tu cuenta para empezar a organizar tus fiestas.
                    </p>
                </div>

                <div className="space-y-5">
                    <div>
                        <label className="mb-2 block text-sm font-medium text-slate-300 text-left">
                            Nombre Completo
                        </label>
                        <input
                            id="name"
                            type="text"
                            placeholder="Ingrese su nombre completo"
                            className="w-full rounded-2xl border border-slate-700 bg-slate-900 px-4 py-3 text-slate-100 outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/30"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-medium text-slate-300 text-left">DNI</label>
                        <input
                            id="dni"
                            type="text"
                            placeholder="Ingrese su DNI"
                            className="w-full rounded-2xl border border-slate-700 bg-slate-900 px-4 py-3 text-slate-100 outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/30"
                            value={dni}
                            onChange={(e) => setDni(e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-medium text-slate-300 text-left">Contraseña</label>
                        <input
                            id="password"
                            type="password"
                            placeholder="Ingrese su contraseña"
                            className="w-full rounded-2xl border border-slate-700 bg-slate-900 px-4 py-3 text-slate-100 outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/30"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <button onClick={register} className="w-full rounded-2xl bg-gradient-to-r from-slate-700 to-indigo-600 px-4 py-3 font-semibold text-white transition hover:brightness-110 focus:outline-none focus:ring-4 focus:ring-indigo-400/30">
                        Registrarse
                    </button>
                </div>
                <p className="text-slate-600 mt-6 text-center">¿Ya tienes cuenta? <a href="/login" className="text-fuchsia-600 font-semibold hover:underline">Inicia sesión aquí</a></p>
            </section>
        </div>
    )
 } 
