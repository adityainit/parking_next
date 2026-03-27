interface historyProps {
  userName: string  
  startedAt: string
  duration: number
  fare: number
  endTime: string
}

export const OwnerHistoryCard = ({ userName, startedAt, endTime, duration, fare }: historyProps) => {
  
  const getInitials = (name: string) => {
    return name.split(" ").map(n => n[0]).join("").toUpperCase()
  }

  const durationFormat = (minutes: number) => {
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    return `${h}h ${m}m`
  }

  return (
    <tr className="hover:bg-gray-50 transition-colors duration-150">
      {/* USER */}
      <td className="px-8 py-5">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center font-bold text-sm shrink-0">
            {getInitials(userName)}
          </div>
          <p className="font-semibold">{userName}</p>
        </div>
      </td>

      {/* DATE & TIME */}
      <td className="px-8 py-5">
        <p className="font-semibold">{new Date(startedAt).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}</p>
        <p className="text-xs text-gray-500 mt-0.5">
          {new Date(startedAt).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", hour12: true })} - {new Date(endTime).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", hour12: true })}
        </p>
      </td>

      {/* DURATION */}
      <td className="px-8 py-5 font-semibold">{durationFormat(duration)}</td>

      {/* FARE */}
      <td className="px-8 py-5 font-semibold text-primary text-right">₹{fare}</td>
    </tr>
  )
}