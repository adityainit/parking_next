"use client"
// hooks/useRFIDEvents.ts
// Drop this hook into any component that needs to react to RFID card taps.
// It opens one SSE connection per browser tab and calls triggerRefresh()
// whenever the NodeMCU triggers a session-started or session-ended event.

import { useSessionStore } from "@/lib/store/sessionStore"
import { useEffect } from "react"

export const useRFIDEvents = () => {
  const { triggerRefresh } = useSessionStore()

  useEffect(() => {
    const es = new EventSource("/api/rfid/events")

    es.addEventListener("session-started", () => {
      triggerRefresh()
    })

    es.addEventListener("session-ended", () => {
      triggerRefresh()
    })

    es.addEventListener("connected", (e) => {
      console.log("[RFID] SSE connected:", e.data)
    })

    es.onerror = () => {
      // EventSource auto-reconnects on error — nothing extra needed.
      console.warn("[RFID] SSE connection lost, will auto-reconnect...")
    }

    return () => {
      es.close()
    }
  }, [triggerRefresh])
}