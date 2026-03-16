import { Role } from "@/app/generated/prisma/enums";
import prisma from "@/lib/prisma";
import { requireRole } from "@/lib/requireRole";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const gaurd = await requireRole(Role.USER);
    if (gaurd.error) return gaurd.error;

    const account = gaurd.account;

    try{
        const body = await req.json();

        await prisma.subscription.updateMany({
            where: {
                    userId: account.id,
                    ownerId: body.ownerId
            },
            data: {
                isActive: false
            }
        })

        return NextResponse.json({message:"Unsubscribed"}, {status:201})
    } catch (err) {
        console.error(err);
        return NextResponse.json({message:"Some internal error"}, {status:501})
    }

    
}