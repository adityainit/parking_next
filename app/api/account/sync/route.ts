import { auth, currentUser } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

import { Role } from "@/app/generated/prisma/enums";

export async function POST(req:Request) {
    try {
        
        const {userId} = await auth(); 
        
        if(!userId) {
            return NextResponse.json({error: "Unauthorized "},{status:401})
        }

        const body = await req.json();

        const role = body.role;

        if(!role || !Object.values(Role).includes(role)) {
            return NextResponse.json(
                {error: "Invalid role"},
                {status: 400}
            )
        }
        

        const existingAccount = await prisma.account.findUnique({
            where:{clerkId: userId}
        });
        if(existingAccount){
            return NextResponse.json(existingAccount)
        }

        const user = await currentUser();

        if(!user) {
            return NextResponse.json({error:"User not found"},{status:404})
        }

        const email = user.emailAddresses[0]?.emailAddress;
        const name = `${user.firstName ?? ""} ${user.lastName ?? ""}`.trim();

        const newAccount = await prisma.account.create({
            data:{
                clerkId: userId,
                email,
                name,
                role
            }
        });

        return NextResponse.json(newAccount)

    } catch (error) {
        console.error(error);
        return NextResponse.json({error: "Internal Server Error"}, {status: 500});
    }
}