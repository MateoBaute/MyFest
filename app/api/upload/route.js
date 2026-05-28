import { NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import path from "path";
import { randomUUID } from "crypto";

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get("image");

    if (!file) {
      return NextResponse.json({ error: "No se recibió imagen" }, { status: 400 });
    }

    const extension = file.name.split(".").pop();
    const fileName = `${randomUUID()}.${extension}`;
    const filePath = path.join(process.cwd(), "public", "uploads", fileName);

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    await writeFile(filePath, buffer);

    return NextResponse.json({ path: `/uploads/${fileName}` }, { status: 200 });
  } catch (error) {
    console.error("Error subiendo imagen:", error);
    return NextResponse.json({ error: "Error al subir imagen" }, { status: 500 });
  }
}
