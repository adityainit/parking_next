import { useSessionStore } from "@/lib/store/sessionStore"
import { cn } from "@/lib/utils"
import axios from "axios"
import { Car, IndianRupee, MapPin, ParkingSquareIcon } from "lucide-react"
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
    index? : number
}




export const LotInfoCard = (props : lotInfoProps) => {

    const variant = (props.index ?? 0) % 2;

    const { triggerRefresh } = useSessionStore()
    const [parking, setParking] = useState<boolean>(false)

    const formatDistance = (km: number) => {
        return `${km.toFixed(1)} KM`
    }


    const lotParams = [
        {name:"Available",value:0}, 
        {name:"Capacity", value:props.lotCapacity},
        {name:"Distance", value:formatDistance(props.distance)}
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
        setParking(true)
        try {
            await axios.post("/api/user/startSession", { parkingLotId: props.id });
            triggerRefresh();
        } catch(err) {
            console.error(err)
        } finally {
            setParking(false)
        }
    }


    return <div className={cn("border-2  overflow-hidden rounded-4xl  transition-all duration-300 ease-in-out",props.type == "full" ? "shadow-lg hover:shadow-xl hover:-translate-y-1" : "bg-stone-300/20 hover:border-emerald-600")}>
            {props.type=="full" ? <div className={cn(" h-48 relative" , variant === 0 ? "bg-[#7ad7c6]" : "bg-[#cfe6f2]")}>
                {/* the pattern div */}
                <div className="absolute top-4 right-4 rounded-full bg-white/70 px-3 py-1 text-xs font-medium text-primary ">
                    {formatDistance(props.distance)}
                </div>
                <div className="absolute inset-0 opacity-30" 
                style={variant === 0 ? {
                    backgroundImage: "radial-gradient(circle at 10px 10px, white 2px, transparent 0)",
                    backgroundSize: "30px 30px"
                } : {
                    backgroundImage: "repeating-linear-gradient(135deg, transparent, transparent 8px, white 8px, white 9px)",
                    backgroundSize: "30px 30px"
                }}>
                </div>
                <span className="relative z-10 flex items-center text-primary/50 justify-center h-full">{variant === 0 ?<Car className="h-20 w-20 "/> : <ParkingSquareIcon className="h-15 w-15  "/>}</span>
            </div> : null}
            <div className="space-y-3 p-8 bg-white">
                {/* heading */}
                <div className="flex justify-between items-center  pb-2">
                    <div className="space-y-1">
                        {/* add a recommended badge */}
                        <h1 className="font-semibold text-xl">{props.name}</h1>
                        <p className=" gap-1 font-medium text-sm text-stone-800">
                            <span>{props.address} </span>
                        </p>
                    </div>
                    <div className="flex flex-col items-end">
                        <p className="text-xs text-primary/80">0 SPOTS AVAILABLE</p>
                        <h1 className="font-semibold text-3xl text-primary">
                            ₹{props.pricePerHour}<span className="text-sm">/HR</span>
                        </h1>
                        
                    </div>
                </div>

                {/* lot details like space lotCapacity and all */}
                {/* <div className="flex justify-between">
                    {lotParams.map((param) => (
                        <div key={param.name}>
                            <p>{param.name}</p>
                            <h1 className="font-semibold text-2xl">{param.value} </h1>
                        </div>
                    ))}
                </div> */}
                
                <div className={cn(sub && "grid grid-cols-2 gap-3")}>
                    
                    {sub && <div>
                        <button disabled={parking} onClick={parkHandler} className="border w-full py-2 border-emerald-600 font-semibold  rounded-lg cursor-pointer hover:bg-primary-container transition-all duration-300 ease-in-out bg-primary text-white">
                            {parking ? "Parking..." : "Park"}
                        </button>
                    </div>}
                    <button onClick={subHandler} 
                    disabled={loading}
                    className="border w-full py-2 font-semibold  rounded-lg cursor-pointer bg-gray-100 hover:bg-gray-200 transition-all duration-300 ease-in-out">
                    {/* do state management here */}
                        {loading
                        ? (sub ? "Unsubscribing..." : "Subscribing...")
                        : (sub ? "Subscribed" : "Subscribe")
                        }
                    </button>
                </div>
            </div>
    </div>
}