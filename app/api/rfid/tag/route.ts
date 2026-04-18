import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const apiKey = req.headers.get("x-api-key")
  if(apiKey !== process.env.RFID_API_KEY) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { cardUid } = await req.json() //11
  console.log("Card tapped:", cardUid)

  const subscriptionId = parseInt(cardUid);

  if(!cardUid) return NextResponse.json(
    { error: "No card UID provided" }, { status: 400 }
  )

  const subscription = await prisma.subscription.findUnique({
    where: { id: subscriptionId },
    include: {
      owner: {
        include: { parkingLot: true }
      }
    }
  })

  if(!subscription || !subscription.isActive) return NextResponse.json(
    { error: "Card not registered or inactive" }, { status: 404 }
  )

  const userId = subscription.userId
  const parkingLot = subscription.owner.parkingLot

  if(!parkingLot) return NextResponse.json(
    { error: "No parking lot found" }, { status: 404 }
  )

  const active = await prisma.parkingSession.findFirst({
    where: { userId, endTime: null }
  })

  if(active) {
    // END SESSION
    const now = new Date()
    const duration = Math.floor((now.getTime() - active.startTime.getTime()) / 60000)
    const fare = Math.round((duration / 60) * parkingLot.pricePerHour)

    await prisma.parkingSession.update({
      where: { id: active.id },
      data: { endTime: now, durationInMinutes: duration, fare }
    })
    if(global.sseController) {
      global.sseController.enqueue(`data: refresh\n\n`)
    }

    return NextResponse.json({ message: "Session ended", duration, fare }, { status: 200 })
  } else {
    // START SESSION
    const session = await prisma.parkingSession.create({
      data: { userId, parkingLotId: parkingLot.id }
    })
    if(global.sseController) {
      global.sseController.enqueue(`data: refresh\n\n`)
    }

    return NextResponse.json({ message: "Session started", sessionId: session.id }, { status: 201 })
  }
}