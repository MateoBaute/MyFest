import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function POST(request){
    try{
        const body = await request.json();
        const { idUser } = body;
        if(!idUser){
            return NextResponse.json(
                { error: "Faltan campos" },
                { status: 400 }
            );
        }
        const [rows] = await db.query(
            "select * from fest where id_creator = ?",
            [idUser]
        );

        if(rows.length === 0){
            return NextResponse.json(
                { error: "Todavía no has creado ninguna fiesta" },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { fiestas: rows },
            { status: 200 }
        );
    }catch(error){
        return NextResponse.json(
            { error: "Error al mostrar la fiesta" },
            { status: 500 }
        );
    }
}