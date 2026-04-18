"use client"
import axios from "axios"
import { useCallback, useEffect, useState } from "react"
import { OwnerHistoryCard } from "../ownerHistoryCard"
import { useSessionStore } from "@/lib/store/sessionStore"

type Session = {
  id: number
  startTime: string
  endTime: string
  durationInMinutes: number
  fare: number
  user: { name: string }
}

export const OwnerHistory = () => {
  const { refreshTrigger } = useSessionStore()
  const [sessions, setSessions] = useState<Session[]>([])
  const [loading, setLoading] = useState<boolean>(false)

  const fetchHistory = useCallback(async () => {
    try {
      setLoading(true)
      const res = await axios.get("/api/owner/sessionHistory")
      setSessions(res.data)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    const eventSource = new EventSource("/api/rfid/stream")
    eventSource.onmessage = (e) => {
      if(e.data === "refresh") fetchHistory()
    }
    eventSource.onerror = () => eventSource.close()
    return () => eventSource.close()
  }, [fetchHistory])

  useEffect(() => {
    fetchHistory()
  }, [fetchHistory, refreshTrigger])

  const headings = ["USER", "DATE & TIME", "DURATION", "FARE"]

  return (
    <div className="max-w-7xl mx-auto px-6 ">
      <div className="space-y-4">
        <div className="">
          <h3 className="text-2xl md:text-3xl font-bold">Session History</h3>
          <span className="text-gray-500 text-sm font-medium">{sessions.length} total sessions</span>
        </div>
        {loading
          ? <div className="flex items-center justify-center p-20 animate-pulse text-xl font-semibold">Loading...</div>
          : sessions.length === 0
          ? <div className="flex items-center justify-center p-20 text-gray-400 text-xl font-semibold rounded-xl border">No sessions yet</div>
          : <div className="rounded-xl overflow-hidden border">
              <table className="w-full text-left border-collapse">
                <thead className="bg-[#f2f4f5] text-gray-500 uppercase text-xs font-bold tracking-widest">
                  <tr>
                    {headings.map(h => (
                      <th key={h} className={`px-8 py-5 ${h === "FARE" ? "text-right" : ""}`}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y bg-white">
                  {sessions.map((session) => (
                    <OwnerHistoryCard
                      key={session.id}
                      userName={session.user.name ?? "Unknown"}
                      startedAt={session.startTime}
                      endTime={session.endTime}
                      duration={session.durationInMinutes}
                      fare={session.fare}
                    />
                  ))}
                </tbody>
              </table>
            </div>
        }
      </div>
    </div>
  )
}