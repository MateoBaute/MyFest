"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useGuests } from "@/app/context/GuestContext";

export default function LoginPage(){
    const router = useRouter();
    const context = useGuests();

    const [dni, setDni] = useState("")
    const [password, setPassword] = useState("")

    async function login(){
        try {
            const response = await fetch('api/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({dni, password}),
            });

            const data = await response.json();
            if(data.success){
                alert("¡Contraseña correcta! Bienvenido.");
                sessionStorage.setItem("token", data.token);
                sessionStorage.setItem("user", JSON.stringify(data.user));
                context.setLogged(true);
                setDni("");
                setPassword("");
                router.push('/'); 
            }else{
                alert("Error al iniciar seison: " + (data.error || "Error desconocido"));
            }

        }catch(error){
            alert("Error al iniciar sesión:", error);
        }
    }

    return(
        <div className="flex items-center justify-center py-12">
            <section className="w-full max-w-md rounded-[32px] border border-slate-700 bg-slate-950/80 p-8 shadow-[0_30px_80px_rgba(15,23,42,0.28)] backdrop-blur-sm animate-fadeIn">
                <div className="mb-6 text-center">
                    <h2 className="text-3xl font-bold text-slate-100">Login</h2>
                    <p className="mt-2 text-sm text-slate-400">
                        Ingresa a tu cuenta para organizar tus fiestas.
                    </p>
                </div>

                <div className="space-y-5">
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

                    <button onClick={login} className="w-full rounded-2xl bg-gradient-to-r from-slate-700 to-indigo-600 px-4 py-3 font-semibold text-white transition hover:brightness-110 focus:outline-none focus:ring-4 focus:ring-indigo-400/30">
                        Entrar
                    </button>
                </div>
                <p className="text-slate-600 mt-6 text-center">¿No tienes cuenta? <a href="/register" className="text-fuchsia-600 font-semibold hover:underline">Regístrate aquí</a></p>
            </section>
        </div>
    )
} 
