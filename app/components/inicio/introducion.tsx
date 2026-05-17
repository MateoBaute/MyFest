import Image from "next/image";

export default function intro() {
    return (
        <div>
            <h2 className="text-1.5xl font-bold">Introducción</h2>

            <div className="relative w-full max-w-[70%] mx-auto">
                <Image
                    src="/imagenes/imagenInicio.jpg"
                    alt="Introducción"
                    width={1000}
                    height={300}
                    className="w-full h-auto rounded-xl"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/30 p-6 text-center">
                    <p className="text-white text-lg font-semibold">
                        Bienvenido a MyFest, tu plataforma definitiva para organizar fiestas inolvidables.
                    </p>
                </div>
            </div>
        </div>
    )
}