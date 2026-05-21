import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function POST(request) {
    try {
        const body = await request.json();
        const { name, date, idUser  } = body;
        if (!name || !date || !idUser) {
            return NextResponse.json(
                { error: "Faltan campos" },
                { status: 400 }
            );
        }
        const [rows] = await db.query(
            "insert into fest (name, date, id_creator) values (?, ?, ?)",
            [name, date, idUser]
        );
        const fiestaId = rows.insertId;
        return NextResponse.json(
            { success: true },
            { id: fiestaId, name, date },
            { status: 201 }
        );
    }catch(error){
        return NextResponse.json(
            { error: "Error al crear la fiesta" },
            { status: 500 }
        );
    }
}