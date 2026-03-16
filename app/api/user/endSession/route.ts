import { Role } from "@/app/generated/prisma/enums";
import prisma from "@/lib/prisma";
import { requireRole } from "@/lib/requireRole";
import { NextResponse } from "next/server";


export async function POST(req:Request) {
    const gaurd = await requireRole(Role.USER);
    if(gaurd.error) return gaurd.error;

    const account = gaurd.account;

    try {
        const active = await prisma.parkingSession.findFirst({
            where:{
                userId:account.id,
                endTime:null
            },
            include:{
                parkingLot:true
            }
        })
        if(!active){
            return NextResponse.json(
                {message:"No active session"},
                {status:404}
            )
        }

        const now = new Date();

        const duration = Math.floor((now.getTime() - active.startTime.getTime()) / 60000);

        const fare = (duration/60) * active.parkingLot.pricePerHour;

        await prisma.parkingSession.update({
            where:{id:active.id},
            data:{
                endTime:now,
                durationInMinutes:duration,
                fare: Math.round(fare)
            }
        })

        return NextResponse.json(
            {message:"Session Ended"},
            {status:200}
        )
    } catch(err) {
        console.error(err);
        return NextResponse.json(
            {message:"Internal server error"},
            {status:500}
        )
    }
}