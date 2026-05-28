import { NextResponse } from "next/server";
import db from "@/lib/db";
import fs from "fs";
import path from "path";

export async function DELETE(request) {
  try {
    const body = await request.json();
    const { id } = body;
    if (!id) {
      return NextResponse.json({ error: "Falta el ID del invitado" }, { status: 400 });
    }

    const [rows] = await db.query(
      "select imagen from guest where id = ?",
      [id]
    );
    const invitado = rows[0];

    if (invitado && invitado.imagen) {
      const imagenRelativa = invitado.imagen.startsWith("/") ? invitado.imagen.slice(1) : invitado.imagen;
      const imagenPath = path.join(process.cwd(), "public", imagenRelativa);
      if (fs.existsSync(imagenPath)) {
        fs.unlinkSync(imagenPath);
      }
    }

    await db.query(
      "delete from guest where id = ?",
      [id]
    );

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Error al eliminar el invitado:", error);
    return NextResponse.json({ error: "Error al eliminar el invitado" }, { status: 500 });
  }
}
