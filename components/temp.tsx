import { Clock4, MapPin } from "lucide-react"

interface historyProps {
    name: string
    address: string
    startedAt: string
    duration: number
    fare: number 
}

export const ParkHistoryCard = ({name,address, startedAt, duration, fare}: historyProps) => {
    const durationFormat = (minutes: number) => {
        const h = Math.floor(minutes/60);
        const m = minutes % 60; 
        return `${h}h ${m}m`
    }
    return <div>
        <div className="border p-6 rounded-lg shadow-md hover:shadow-lg">
            <div>
                <div className="flex justify-between border-b pb-2">
                    <div className="space-y-1">
                        <h1 className="font-bold text-lg">{name}</h1>
                        <p className="flex gap-1 items-center">
                            <MapPin className="w-4"/>
                            <span>{address}</span>
                        </p>
                    </div>
                    <div>
                        <h1 className="text-2xl text-emerald-600 font-semibold">₹{fare}</h1>
                        <p className="font-semibold text-sm">{durationFormat(duration)}</p>
                    </div>
                </div>

                <div className="pt-2 flex gap-1 items-center">
                    <Clock4 className="w-4"/>
                    <p className="">
                        {new Date(startedAt).toLocaleDateString("en-IN",{
                            month:"short",
                            day:"2-digit",
                            year:"numeric"
                        })} - {new Date(startedAt).toLocaleTimeString("en-IN",{
                            hour:"2-digit",
                            minute: "2-digit",
                            hour12:true
                        })}
                    </p>
                </div>
            </div>

        </div>
    </div>
}