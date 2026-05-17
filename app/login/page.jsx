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
            const reponse = await fetch('api/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({dni, password}),
            });

            const data = await reponse.json();
            if(data.success){
                alert("¡Contraseña correcta! Bienvenido.");
                localStorage.setItem("token", data.token);
                context.setGuest(data.user);
                context.setLogged(true);
                setDni("");
                setPassword("");
                router.push('/'); 
            }else{
                alert(data.error || "Error al iniciar sesión");
            }


        }catch(error){
            alert("Error al iniciar sesión:", error);
        }
    }

    return(
        <div className="flex items-center justify-center my-30">
            <section className="w-full max-w-sm rounded-lg border bg-[#fff] border-zinc-200  p-6 shadow-sm">
                <div className="mb-6 text-center">
                    <h2 className="text-2xl font-bold text-zinc-900">Login</h2>
                    <p className="mt-2 text-sm text-zinc-600">
                        Ingresa a tu cuenta para organizar tus fiestas.
                    </p>
                </div>

                <div className="space-y-4">
                    <div>
                        <label className="mb-1 block text-sm font-medium text-zinc-700 text-start"> DNI </label>
                        <input
                            id="dni"
                            type="text"
                            placeholder="Ingrese su DNI"
                            className="w-full text-center  rounded-md border border-zinc-300 px-3 py-2 text-zinc-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                            value={dni}
                            onChange={(e) => setDni(e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="mb-1 block text-sm font-medium text-zinc-700 text-start ">Contraseña</label>
                        <input
                            id="password"
                            type="password"
                            placeholder="Ingrese su contraseña"
                            className="w-full text-center rounded-md border border-zinc-300 px-3 py-2 text-zinc-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <button onClick={login} className="w-full rounded-md bg-blue-600 px-4 py-2 font-semibold text-[var(--color-foreground)] transition hover:opacity-85 focus:outline-none focus:ring-2 focus:ring-blue-300">
                        Entrar
                    </button>
                </div>
                <p className="text-black mt-6">¿No tienes cuenta? <a href="/register" className="text-blue-500 hover:underline">Regístrate aquí</a></p>
            </section>
        </div>
    )
} 
