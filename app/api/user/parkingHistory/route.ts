import { Role } from "@/app/generated/prisma/enums";
import prisma from "@/lib/prisma";
import { requireRole } from "@/lib/requireRole";
import { NextResponse } from "next/server";

export async function GET() {
    const gaurd = await requireRole(Role.USER);
    if (gaurd.error ) return gaurd.error;

    const account = gaurd.account;


    try{
        const parkingSessions = await prisma.parkingSession.findMany({
            where:{
                userId:account.id,
                endTime:{ not: null}
            },
            include:{
                parkingLot: true
            },
            orderBy:{
                startTime:"desc"
            }
        })
        if(parkingSessions.length === 0) return NextResponse.json(
            {message:"No history found"},
            {status:200}
        )
        return NextResponse.json(parkingSessions,{status:200})
    } catch(err) {
        console.error(err);
        return NextResponse.json(
            {message:"Internal server error"},
            {status:500}
        )
    }
}