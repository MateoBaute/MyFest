import Header from "@/app/components/header";
import Footer from "@/app/components/footer";
import { GuestProvider } from "./context/GuestContext";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="flex flex-col min-h-screen">
        <GuestProvider>
        <Header />
          <main className="flex-grow text-center p-4">
            {children}
          </main>
        <Footer />
        </GuestProvider>
      </body>
    </html>
  );
}
