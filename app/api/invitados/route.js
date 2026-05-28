import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, dni, imagen, idFiesta } = body;

    if (!name || !dni || !idFiesta) {
      return NextResponse.json({ error: "Faltan campos para crear el invitado" }, { status: 400 });
    }

    await db.query(
      "INSERT INTO guest (name, dni, imagen, id_fest) VALUES (?, ?, ?, ?)",
      [name, dni, imagen || null, idFiesta]
    );

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Error al guardar invitado:", error);
    return NextResponse.json({ error: "Error al guardar el invitado" }, { status: 500 });
  }
}
