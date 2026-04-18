"use client"
import axios from "axios"
import { useEffect, useState } from "react"
import { ParkHistoryCard } from "../parkHistoryCard"
import { useSessionStore } from "@/lib/store/sessionStore"
import { cn } from "@/lib/utils"

type ParkingLot = {
    id: number;
    name: string;
    address: string;
}

type Sessions = {
    id: number;
    fare: number;
    startTime: string;
    durationInMinutes: number;
    parkingLot: ParkingLot;
    endTime: string;
}

export const ParkHistory = () => {

    const { refreshTrigger } = useSessionStore();
    const [loading, setLoading] = useState<boolean>(false);
    const [yes, setYes] = useState<boolean>(false);

    const [sessions,setSessions] = useState<Sessions[]>([]);

    const headingParams = ["LOCATION", "DATE & TIME", "DURATION", "COST"]

    useEffect(() => {
        const fetchHistory = async () => {
            try{
                setLoading(true);
                const res = await axios.get("/api/user/parkingHistory")
                setSessions(res.data);
                setYes(res.data.length > 0)
                
            } finally {
                setLoading(false);
            }
        }
        fetchHistory();
    },[refreshTrigger])

    return <div>
        <div className="max-w-7xl px-6 py-10 mx-auto pb-50">
            <div className="space-y-5">
                <div className="space-y-1">
                    <h1 className="font-bold md:text-3xl text-2xl">Parking history</h1>
                    <p className="text-stone-600 ">{sessions.length} parking sessions</p>
                </div>
                {loading? <div className="shadow-md flex items-center justify-center text-xl font-semibold p-20 animate-pulse">Loading...</div> : sessions.length === 0 ? (<div className="shadow-md flex items-center justify-center text-xl font-semibold p-20 ">No parking history yet</div>) : (

                    <div className="rounded-4xl overflow-hidden ">
                        <table className="w-full text-left border-collapse">
                            <thead>
                            <tr className="bg-gray-200 text-xs font-medium tracking-widest border-b border-gray-200">
                                <th className="px-8 py-5">LOCATION</th>
                                <th className="px-8 py-5">DATE & TIME</th>
                                <th className="px-8 py-5">DURATION</th>
                                <th className="px-8 py-5 text-right">COST</th>
                            </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-100">
                            {sessions.map((session) => (
                                <ParkHistoryCard key={session.id} name={session.parkingLot.name} address={session.parkingLot.address} startedAt={session.startTime} endTime={session.endTime} duration={session.durationInMinutes} fare={session.fare}/>
                            ))}
                            </tbody>
                        </table>
                    </div>) 
                    
                    }
            </div>
        </div>
    </div>
}