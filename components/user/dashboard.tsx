"use client"

import { useState } from "react"
import { ActiveSession } from "./activeSession"
import { HeroSection } from "./heroSection"
import { ParkHistory } from "./parkHistory"
import { Recommend } from "./recommend"

type Lot = {
  id: number
  name: string
  ownerId: number
  address: string
  lotCapacity: number
  pricePerHour: number
  isActive: boolean
  latitude: number
  longitude: number
  distance?: number
}


export const UserDashboard = () => {
    const [lots,setLots] = useState<Lot[]>([]);

    return <div className="">
        <HeroSection lots={lots}/>
        <Recommend lots={lots} setLots={setLots}/>
        <ActiveSession/>
        <ParkHistory/>
    </div>
}