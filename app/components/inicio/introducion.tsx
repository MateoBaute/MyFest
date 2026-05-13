import Image from "";

export default function intro() {
    return (
        <div>
            <h2 className="text-1.5xl font-bold">Introducción</h2>
            <Image
                src="/imagenes/imageninicio.jpg"
                alt="Introducción"
                width={500} // NextJS te pide obligatoriamente un ancho
                height={300} // y un alto para optimizar
                className="mx-auto"
            />

            <p>Bienvenido a MyFest, tu plataforma definitiva para organizar fiestas inolvidables. Con MyFest, puedes planificar cada detalle de tu evento, desde la lista de invitados hasta la decoración y el entretenimiento. Nuestra aplicación te ofrece herramientas fáciles de usar para crear la fiesta perfecta, sin estrés ni complicaciones. ¡Empieza a planificar tu próxima fiesta con MyFest hoy mismo!</p>
        </div>
    )
}