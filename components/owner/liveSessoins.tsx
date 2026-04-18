"use client"

import { useSessionStore } from "@/lib/store/sessionStore"
import axios from "axios"
import { useCallback, useEffect, useState } from "react"
import { LiveSessionCard } from "../liveSessionCard"
import { cn } from "@/lib/utils"

type sessions = {
    id: number
    startTime: string
    user: {name: string}

}

export const LiveSessions = ({pricePerHour} : {pricePerHour: number}) => {

    const [ sessions,setSessions ] = useState<sessions[]>([]);
    const [ loading,setLoading ] = useState<boolean>(false);

    const fetchSessions = useCallback(async () => {
        try {
            setLoading(true);
            const res = await axios.get("/api/owner/activeSessions");
            setSessions(res.data);
        } finally {
            setLoading(false);
        }
        
    }, [])

    // SSE listener
    useEffect(() => {
        const eventSource = new EventSource("/api/rfid/stream")
        eventSource.onmessage = (e) => {
            if(e.data === "refresh") fetchSessions()
        }
        eventSource.onerror = () => eventSource.close()
        return () => eventSource.close()
    }, [fetchSessions])

    useEffect(() => {
        
        fetchSessions();
        //do something like it will re-fetch the data in every 10 second web sockets > setInterval
    },[fetchSessions])

    

    

    return (
        <div className="px-6 py-6 max-w-7xl mx-auto">
            <div className="space-y-4">
                <div className="space-y-1">
                    <h3 className="text-2xl md:text-3xl font-bold">Live Sessions</h3>
                    <span className="text-stone-700 font-medium text-sm">{sessions.length} Active Sessions</span>
                </div>

                <div className="rounded-xl overflow-hidden border">
                    <table className="w-full text-left border-collapse">
                    <thead className="bg-[#f2f4f5] uppercase text-xs font-bold tracking-widest">
                        <tr>
                        {["User", "Start Time", "Duration", "Estimated Fare", "Status"].map(h => (
                            <th key={h} className={cn("px-8 py-5", (h === "Start Time")? "hidden md:table-cell" : "")}>{h}</th>
                        ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y bg-white">
                    {loading
                        ? <tr><td colSpan={5} className="px-8 py-10 text-center animate-pulse font-semibold">Loading...</td></tr>
                        : sessions.length === 0
                        ? <tr><td colSpan={5} className="px-8 py-10 text-center text-gray-400">No active sessions</td></tr>
                        : sessions.map((session) => (
                        <LiveSessionCard
                            key={session.id}
                            name={session.user.name ?? "Unknown"}
                            startTime={session.startTime}
                            pricePerHour={pricePerHour}
                        />
                        ))
                    }
</tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}