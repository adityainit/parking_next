"use client"
import { useSessionStore } from "@/lib/store/sessionStore"
import { cn } from "@/lib/utils"
import axios from "axios"
import { MapPin } from "lucide-react"
import { useCallback, useEffect, useState } from "react"

export const ActiveSession = () => {
  const { refreshTrigger, triggerRefresh } = useSessionStore(); // ← merged
  const [exiting, setExiting] = useState<boolean>(false)
  const [sessionData, setSessionData] = useState<any>([]);
  const [lotData, setLotData] = useState<any>(null);
  const [startTime, setStartTime] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [active, setActive] = useState<boolean>(false);

  const exitHandler = async () => {
    setExiting(true)
    try {
      await axios.post("/api/user/endSession");
      triggerRefresh();
      setActive(false);
      setSessionData([]);
      setLotData(null);
      setStartTime(null);
    } catch(err) {
      console.error(err)
    } finally {
      setExiting(false)
    }
  }

  const fetchSession = useCallback(async (showLoader = true) => { // ← useCallback
    try {
      if(showLoader) setLoading(true)
      const res = await axios.get("/api/user/activeSession")
      if(res.status == 201) {
        setStartTime(res.data.startTime);
        setSessionData(res.data)
        setLotData(res.data.parkingLot)
        setActive(true)
      } else {
        setActive(false)
        setLotData(null);
        setStartTime(null)
      }
    } finally {
      if(showLoader) setLoading(false)
    }
  }, []) // ← empty deps, only uses setState functions

  useEffect(() => {
    const eventSource = new EventSource("/api/rfid/stream")
    eventSource.onmessage = (e) => {
      if(e.data === "refresh") {
        triggerRefresh();
        fetchSession(false);
      }
    }
    eventSource.onerror = () => eventSource.close()
    return () => eventSource.close()
  }, [fetchSession, triggerRefresh])

  useEffect(() => {
    fetchSession(true)
  }, [refreshTrigger, fetchSession])

  // ... rest of your code stays the same

    const getDuration = () => {
        if(!startTime) return 0;
        const start = new Date(startTime)
        const now = new Date();
        return Math.floor((now.getTime() - start.getTime())/60000)
    }

    const durationMinutes = getDuration();

    const formatDuration = (minutes:number) => {
        const h = Math.floor(minutes/60);
        const m = minutes % 60;
        return `${h}h ${m}m`
    }

    const getFare = () => {
        if(!lotData) return 0;
        const minutes = getDuration();
        return ((minutes/60) * lotData.pricePerHour).toFixed(2);
    }

    const cardParams = [
        {name:"Start Time", value:startTime ? new Date(startTime).toLocaleTimeString("en-IN",{
            hour:"2-digit",
            minute:"2-digit",
            hour12:true
        }) : ""},
        {name:"Duration",value:formatDuration(durationMinutes)},
        {name:"Current Fare",value: `₹${getFare()}`}
    ]


    return <div>
        <div className="max-w-7xl mx-auto px-6 ">
            <div className="space-y-5">
                <div>
                    <h1 className="font-bold md:text-3xl text-2xl">Your Active Session</h1>
                </div>

                {loading ? <div className="shadow-md flex items-center justify-center text-xl font-semibold p-20 animate-pulse">Loading...</div> : (active && lotData)? (<div className="rounded-lg overflow-hidden shadow-lg hover:shadow-xl border-2">
                    <div className="flex justify-between bg-gradient-to-br from-primary via-teal-500 to-cyan-600 text-white p-6 items-center ">
                        <div className="space-y-2 ">
                            <h1 className="font-bold text-2xl">{lotData.name}</h1>
                            <p className="flex gap-1 font-semibold items-center">
                                <MapPin className="w-5"/>
                                <span>{lotData.address}</span>
                            </p>
                        </div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-400 rounded-full text-sm font-semibold">
                            <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                            Parked
                        </div>
                    </div>
                    <div className="md:flex justify-between p-6 py-8">
                        {cardParams.map((param) => (
                            <div key={param.name}>
                                <p className="text-stone-700">{param.name}</p>
                                <p className={cn("font-semibold text-xl",(param.name) == "Current Fare" && "text-emerald-600 font-bold")}>{param.value}</p>
                            </div>
                        ))}
                            <button disabled={exiting} onClick={exitHandler} className="bg-rose-500 px-8 text-white font-semibold text-lg rounded-sm cursor-pointer hover:scale-103 transition-all duration-300 ease-in-out">{exiting ? "Exiting..." : "Exit"}</button>
                    </div>
                </div>) : <div className="shadow-md flex items-center justify-center text-xl font-semibold p-20">No active sessions</div>}
            </div>
        </div>
    </div>
}