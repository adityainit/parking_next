import { Role } from "@/app/generated/prisma/enums";
import prisma from "@/lib/prisma";
import { requireRole } from "@/lib/requireRole";
import { NextResponse } from "next/server";


export async function POST(req: Request) {
    try {
        const guard = await requireRole(Role.OWNER);
        if(guard.error) return guard.error;

        const owner = guard.account;

        const body = await req.json();
        const {name, latitude, longitude, address, lotCapacity, pricePerHour } = body;

        if(latitude == null || longitude == null || address == null || !lotCapacity  || !pricePerHour ) {
            return NextResponse.json({error: "Missing required fields"}, {status:400})
        }

        if(lotCapacity <=0 || pricePerHour <=0) {
            return NextResponse.json({error:"Invalid Capacity or price"}, {status:400})
        }

        const existingLot = await prisma.parkingLot.findUnique({
            where: {
                ownerId: owner.id
            }
        })

        if(existingLot) {
            return NextResponse.json({error:"Owner already has a parking lot"}, {status: 400})
        }

        const parkingLot = await prisma.parkingLot.create({
            data:{
                ownerId: owner.id,
                name,
                longitude,
                latitude,
                lotCapacity,
                pricePerHour,
                address
            }
        })

        return NextResponse.json(parkingLot, {status:201});


    } catch(error) {
        console.error(error);
        return NextResponse.json(
            {error: "Internal Server Error"},
            {status: 500}
        )
    }
}