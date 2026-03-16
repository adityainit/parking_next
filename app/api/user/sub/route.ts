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

        await prisma.subscription.upsert({
            where: {
                userId_ownerId: {
                    userId: account.id,
                    ownerId: body.ownerId
                }
            },
            update: {
                isActive: true
            },
            create:{
                userId: account.id,
                ownerId: body.ownerId,
                isActive: true
            }
        })

        return NextResponse.json({message:"Subscribed"}, {status:201})
    } catch (err) {
        console.error(err);
        return NextResponse.json({message:"Some internal error"}, {status:501})
    }

    
}