"use client"

import axios from "axios"
import { useEffect, useState } from "react"

type lotInfo = {
    lotCapacity: number
    occupiedSpots: number
    availableSpots: number
    revenue: number
}

export const LotInfo = () => {

    const [ lotStats, setLotsStats ] = useState<lotInfo | null>(null); 

    useEffect(() => {
        const fetchLotStats = async () => {
            const res = await axios.get("/api/owner/lotStats");
            setLotsStats(res.data);
            console.log(res.data);
        }
        fetchLotStats()
    },[])

    return <div>
        <div>
            <div>
                <p>Total Capacity</p>
                <h1>{lotStats?.lotCapacity}</h1>
            </div>
            
        </div>
    </div>
}