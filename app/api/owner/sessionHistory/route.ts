import { Role } from "@/app/generated/prisma/enums";
import prisma from "@/lib/prisma";
import { requireRole } from "@/lib/requireRole";
import { NextResponse } from "next/server";

export async function GET() {
  const gaurd = await requireRole(Role.OWNER);
  if(gaurd.error) return gaurd.error;
  const account = gaurd.account;

  const lot = await prisma.parkingLot.findUnique({
    where: { ownerId: account.id }
  })

  if(!lot) return NextResponse.json({ error: "No lot found" }, { status: 404 })

  const sessions = await prisma.parkingSession.findMany({
    where: {
      parkingLotId: lot.id,
      endTime: { not: null }  
    },
    include: {
      user: true
    },
    orderBy: {
      startTime: "desc"  
    }
  })

  return NextResponse.json(sessions, { status: 200 })
}