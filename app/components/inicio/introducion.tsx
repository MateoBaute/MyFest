import Image from "next/image";

export default function intro() {
    return (
        <section className="hero-card slide-up">
            <div className="px-6 py-8 sm:px-10">
                <h2 className="text-3xl font-bold mb-4 text-slate-100">Introducción</h2>
                <p className="text-slate-300 mb-6 max-w-3xl">
                    Descubre cómo MyFest te ayuda a llevar tus celebraciones al siguiente nivel con listas fáciles de usar, invitados organizados y una experiencia visual pensada para ti.
                </p>
            </div>

            <div className="relative w-full mx-auto overflow-hidden rounded-[28px]">
                <Image
                    src="/imagenes/imagenInicio.jpg"
                    alt="Introducción"
                    width={1000}
                    height={300}
                    className="intro-image w-full h-auto object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-slate-950/25 p-6 text-center backdrop-blur-sm">
                    <p className="text-white text-lg font-semibold tracking-wide drop-shadow-lg">
                        Bienvenido a MyFest, tu plataforma definitiva para organizar fiestas inolvidables.
                    </p>
                </div>
            </div>
        </section>
    )
}