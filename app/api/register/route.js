import { NextResponse } from 'next/server'
import db from '@/lib/db';
import bcrypt from 'bcryptjs';

export async function POST(request) {
    try {
        const body = await request.json();
        const { name, dni, password } = body;
        if (!name || !dni || !password) {
            return NextResponse.json(
                { error: "Faltan campos" },
                { status: 400 }
            );
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const [rows] = await db.query(
            "insert into users (name, dni, password) values (?, ?, ?)",
            [name, dni, hashedPassword]
        );
        const userId = rows.insertId;
        return NextResponse.json(
            { id: userId, name, dni },
            { status: 201 }
        );
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { error: "Error en el servidor" },
            { status: 500 }
        );
    }
}