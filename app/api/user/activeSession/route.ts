import { Role } from "@/app/generated/prisma/enums";
import prisma from "@/lib/prisma";
import { requireRole } from "@/lib/requireRole";
import { NextResponse } from "next/server";

export async function GET(){
    const gaurd = await requireRole(Role.USER);
    if(gaurd.error) return gaurd.error;

    const account = gaurd.account;

    try{
        const active = await prisma.parkingSession.findFirst({
            where:{
                userId: account.id,
                endTime: null
            },
            include:{
                parkingLot:true
            }
        })
        console.log(active);
        if(active) {
            return NextResponse.json(active,{status:201})
        } else {
            return NextResponse.json(
                {active:false},
                {status:200}
            )
        }
    } catch(err) {
        console.log(err);
        return NextResponse.json(
            {message:"Internal Server error"},
            {status:500}
        )
    }
}