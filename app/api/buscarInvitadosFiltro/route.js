import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function POST(request) {
  try {
    const body = await request.json();
    const { idFiesta, query } = body;

    if (!idFiesta) {
      return NextResponse.json({ error: "Falta el ID de la fiesta" }, { status: 400 });
    }

    const filtro = query ? `%${query}%` : "%";
    const [rows] = await db.query(
      "select * from guest where id_fest = ? and (dni LIKE ? or name LIKE ?)",
      [idFiesta, filtro, filtro]
    );

    return NextResponse.json({ success: true, invitados: rows }, { status: 200 });
  } catch (error) {
    console.error("Error al filtrar invitados:", error);
    return NextResponse.json({ error: "Error al buscar invitado" }, { status: 500 });
  }
}
