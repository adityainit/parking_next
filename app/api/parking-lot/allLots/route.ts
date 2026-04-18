import { getCurrentAccount } from "@/lib/getCurrentAcc";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";


export async function GET(req: Request) {
    const account = await getCurrentAccount();
    if(!account) {
        return NextResponse.json({error:"Unauthorized"},{status:401})
    }
    const userId = account.id
    try {
        const allLots = await prisma.parkingLot.findMany({
            include:{
                owner: {
                    include: {
                        ownerSubscriptions:{
                            where:{
                                userId:userId,
                                isActive:true
                            }
                        }
                    }
                }
            }
        });



        const formattedLots = allLots.map((lot) => ({
            id: lot.id,
            name: lot.name,
            ownerId: lot.ownerId,
            longitude: lot.longitude,
            latitude: lot.latitude,
            address: lot.address,
            lotCapacity: lot.lotCapacity,
            pricePerHour: lot.pricePerHour,
            createdAt: lot.createdAt,
            isActive: lot.owner.ownerSubscriptions.length > 0
        }));


        return NextResponse.json({allLots:formattedLots}, {status:200});
    } catch(err) {
        console.error(err);
        return NextResponse.json({error:"Internal Server Error"}, {status:501})
    }
}