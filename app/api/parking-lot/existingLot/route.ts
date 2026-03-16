import { Role } from "@/app/generated/prisma/enums";
import prisma from "@/lib/prisma";
import { requireRole } from "@/lib/requireRole";
import { NextResponse } from "next/server";


export async function GET(req: Request) {

    try {
        const gaurd = await requireRole(Role.OWNER)
        if(gaurd.error) return gaurd.error;

        const owner = gaurd.account;

        const existingLot = await prisma.parkingLot.findUnique({
            where: {ownerId: owner.id}
        })

        if(!existingLot) {
            return NextResponse.json(
                {error:"Parking lot not found fk it"},
                {status: 404}
            )
        } 

        return NextResponse.json(existingLot, {status:200});
        
    } catch(error) {
        console.error(error);
        return NextResponse.json(
            {error: "Internal Server Error"},
            {status: 500}
        )
    }
    

}