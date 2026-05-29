import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function POST(request) {
    try {
        const { idFiesta } = await request.json();
        await db.query('DELETE FROM fest WHERE id = ?', [idFiesta]);

        return NextResponse.json({
            message: 'Fiesta eliminada correctamente',
            success: true},
            { status: 200 });
    } catch (error) {
        console.error('Error al eliminar la fiesta:', error);
        return NextResponse.json({ message: 'Error al eliminar la fiesta', success: false });
    }
}