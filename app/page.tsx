import Intro from "@/app/components/inicio/introducion";

export default function Home() {
  return (
    <div className="page-fade-in">
      <main className="max-w-5xl mx-auto space-y-10 py-6">
        <section className="slide-up">
          <h1 className="text-5xl font-extrabold tracking-tight text-slate-100 mb-4">
            Bienvenido a MyFest
          </h1>
          <p className="text-lg text-slate-300 max-w-3xl mx-auto">
            Organiza tus fiestas con estilo, crea listas de invitados y vive la experiencia de una plataforma diseñada para tus celebraciones.
          </p>
        </section>
        <Intro />
      </main>
    </div>
  );
}