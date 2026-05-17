import { NextResponse } from "next/server";
import db from "@/lib/db";
import bcrypt from "bcryptjs";
import { createToken } from "@/lib/auth";

export async function POST(request) {
    try {
        const body  = await request.json();
        const { dni, password } = body;

        console.log("Received login request with DNI:", dni);
        console.log("Received login request with password:", password);
        if(!dni || !password){
            return NextResponse.json(
                {error: "Faltan campos"},
                {status: 400});
        }


        const [rows] = await db.query(
            "select * from users where dni = ?",
            [dni]
        )
        const user = rows[0];

        if(!user){
            return NextResponse.json(
                {error: "No se encontró el usuario con ese DNI"},
                {status: 404});
        }

        const passwrodMatch = await bcrypt.compare(password, user.password);
        if(!passwrodMatch){
            return NextResponse.json(
                {error: "Contraseña incorrecta"},
                {status: 401});
        }

        const token = createToken({id: user.id, name: user.name, dni: user.dni});
         return NextResponse.json(
      {
        message: "Login exitoso",
        success: true,
        token,
        user: {
          id: user.id,
          name: user.name,
          dni: user.dni,
        },
      },
      { status: 200 }
    );

    }catch(error){
        console.error(error);
        return NextResponse.json(
            {error: "Error en el servidor"},
            {status: 500});
    }
}