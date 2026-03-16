import { Role } from "@/app/generated/prisma/enums";
import prisma from "@/lib/prisma";
import { requireRole } from "@/lib/requireRole";
import { NextResponse } from "next/server";

export async function POST(req: Request) {

    const gaurd = await requireRole(Role.USER);
    if(gaurd.error) return gaurd.error;

    const account = gaurd.account;

    try {
        const body = await req.json();

        const active = await prisma.parkingSession.findFirst({
            where: {
                userId: account.id,
                endTime: null
            }
        });
        if(active) {
            return NextResponse.json(
                {message:"You already have an active parking session"},
                {status:400}
            )
        };

        const session = await prisma.parkingSession.create({
            data:{
                userId: account.id,
                parkingLotId: body.parkingLotId
            }
        })
        return NextResponse.json(session,{status:201})

    } catch(err) {
        console.error(err);
        return NextResponse.json(
            {message:"Internal Error"},
            {status:500}
        )
    }
} 