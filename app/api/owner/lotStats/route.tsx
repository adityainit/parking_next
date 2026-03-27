import { Role } from "@/app/generated/prisma/enums";
import prisma from "@/lib/prisma";
import { requireRole } from "@/lib/requireRole";
import { NextResponse } from "next/server";


export async function GET() {
    const gaurd = await requireRole(Role.OWNER);
    if(gaurd.error) return gaurd.error;

    const account = gaurd.account;

    const lot = await prisma.parkingLot.findUnique({
        where:{
            ownerId:account.id
        },
        include:{
            sessions: {
                where: {endTime: null}
            }
        }
    })

    if(!lot) {
        return NextResponse.json(
            {message:"No lot found"},
            {status:404}
        )
    }

    const occupiedSpots = lot.sessions.length;
    const availableSpots = lot.lotCapacity - occupiedSpots;

    const startOfToday = new Date();
    startOfToday.setHours(0,0,0,0);

    //make it total revenue instead of today's revernue

    const revenueData = await prisma.parkingSession.aggregate({
        where:{
            parkingLotId: lot.id,
            endTime: {gte: startOfToday}
        },
        _sum: {fare:true}
    })

    const todayRevenue = revenueData._sum.fare ?? 0;

    return NextResponse.json({
        lotCapacity: lot.lotCapacity,
        occupiedSpots,
        availableSpots,
        todayRevenue
    }, {status: 200})
    
}