export default function Header() {
  return (
    <header className="bg-blue-600 text-white p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">MyFest 🥳</h1>
      <nav>
        <ul className="flex gap-4">
          <li><a href="/">Inicio</a></li>
          <li><a href="/listas">Mis Listas</a></li>
        </ul>
      </nav>
    </header>
  );
}