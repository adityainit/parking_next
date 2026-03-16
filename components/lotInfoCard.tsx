import { useSessionStore } from "@/lib/store/sessionStore"
import { cn } from "@/lib/utils"
import axios from "axios"
import { IndianRupee, MapPin } from "lucide-react"
import { useState } from "react"


interface lotInfoProps {
    id: number
    name: string
    address: string
    distance: number
    pricePerHour: number
    lotCapacity: number
    type? : "full" | "half"
    ownerId : number
    isActive? : boolean 
}




export const LotInfoCard = (props : lotInfoProps) => {

    const { triggerRefresh } = useSessionStore()

    const lotParams = [
        {name:"Available",value:0}, 
        {name:"Capacity", value:props.lotCapacity},
        {name:"Distance", value:0}
        // figure out about the distance and the capacity
    ]

    const [sub, setSub] = useState<boolean>(props.isActive ?? false);

    const [loading, setLoading] = useState<boolean>(false)

    const subHandler = async () => {
        if(loading) return;
        setLoading(true);
        try {
            if (sub) {
            await axios.post("/api/user/unSub", {
                ownerId: props.ownerId
            });

            setSub(false);
            } else {
            await axios.post("/api/user/sub", {
                ownerId: props.ownerId
            });

            setSub(true);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    }

    const parkHandler = async () => {
        try{
            await axios.post("/api/user/startSession",{
                parkingLotId: props.id
            });
            triggerRefresh();
            console.log("Parking session started")
        } catch(err) {
            console.error(err)
        }
    }


    return <div className={cn("border-2  overflow-hidden rounded-lg  transition-all duration-300 ease-in-out",props.type == "full" ? "shadow-lg hover:shadow-xl hover:-translate-y-1" : "bg-stone-300/20 hover:border-emerald-600")}>
            {props.type=="full" ? <div className="bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-600 h-40"/> : null}
            <div className="space-y-3 p-5">
                {/* heading */}
                <div className="flex justify-between items-center border-b pb-2">
                    <div>
                        {/* add a recommended badge */}
                        <h1 className="font-semibold text-xl">{props.name}</h1>
                        <p className="flex items-center gap-1 text-sm text-stone-800">
                            <MapPin className="w-3 text-emerald-700"/>
                            <span>{props.address} </span>
                        </p>
                    </div>
                    <div className="flex flex-col items-end">
                        <h1 className="font-semibold text-3xl text-emerald-600">
                            ₹{props.pricePerHour}
                        </h1>
                        <p className="text-sm text-stone-600">per hour</p>
                    </div>
                </div>

                {/* lot details like space lotCapacity and all */}
                <div className="flex justify-between">
                    {lotParams.map((param) => (
                        <div key={param.name}>
                            <p>{param.name}</p>
                            <h1 className="font-semibold text-2xl">{param.value} {param.name == "Distance" && "mi"}</h1>
                        </div>
                    ))}
                </div>
                
                <div className={cn(sub && "grid grid-cols-2 gap-3")}>
                    <button onClick={subHandler} 
                    disabled={loading}
                    className="border w-full py-2 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold  rounded-lg cursor-pointer hover:shadow-lg hover:shadow-emerald-600/20 hover:scale-103 transition-all duration-300 ease-in-out">
                    {/* do state management here */}
                        {loading
                        ? (sub ? "Unsubscribing..." : "Subscribing...")
                        : (sub ? "Subscribed" : "Subscribe")
                        }
                    </button>
                    {sub && <div>
                        <button onClick={parkHandler} className="border w-full py-2 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold  rounded-lg cursor-pointer hover:shadow-lg hover:shadow-emerald-600/20 hover:scale-103 transition-all duration-300 ease-in-out">
                            Park
                        </button>
                    </div>}
                </div>
            </div>
    </div>
}