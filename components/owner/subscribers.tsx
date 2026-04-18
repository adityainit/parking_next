"use client"
import axios from "axios"
import { useEffect, useState } from "react"
import { SubscriberCard } from "../subscriberCard"

type Subscriber = {
  id: number
  subscribedAt: string
  user: {
    name: string
    email: string
  }
}

export const Subscribers = () => {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([])
  const [showAll, setShowAll] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    const fetchSubscribers = async () => {
      try {
        setLoading(true)
        const res = await axios.get("/api/owner/subscribers")
        setSubscribers(res.data)
      } finally {
        setLoading(false)
      }
    }
    fetchSubscribers()
  }, [])

  const displayed = showAll ? subscribers : subscribers.slice(0, 4)

  return (
    <div className="space-y-4 px-6 max-w-7xl mx-auto py-6">
      <div className="flex justify-between items-center">
        <h3 className="text-2xl md:text-3xl font-bold">Subscribers</h3>
        {subscribers.length > 4 && (
          <button
            onClick={() => setShowAll(!showAll)}
            className="text-emerald-600 font-bold text-sm hover:underline"
          >
            {showAll ? "Show Less" : "View All"}
          </button>
        )}
      </div>

      {loading
        ? <div className="bg-[#f2f4f5] rounded-xl p-10 text-center animate-pulse font-semibold">Loading...</div>
        : subscribers.length === 0
        ? <div className="bg-[#f2f4f5] rounded-xl p-10 text-center text-gray-400">No subscribers yet</div>
        : <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {displayed.map((sub) => (
              <SubscriberCard
                key={sub.id}
                name={sub.user.name ?? "Unknown"}
                subscribedAt={sub.subscribedAt}
              />
            ))}
          </div>
      }
    </div>
  )
}