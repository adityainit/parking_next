"use client"
import axios from "axios";
import { ArrowRight, MoveRight, X } from "lucide-react"
import { useEffect, useState } from "react"
import { LotInfoCard } from "../lotInfoCard";


type Lot = {
  id: number
  name: string
  ownerId: number
  address: string
  lotCapacity: number
  pricePerHour: number
  isActive: boolean
  latitude: number
  longitude: number
  distance?: number
}

const getDistanceKm = (lat1: number, lon1: number, lat2: number, lon2: number) => {
  const R = 6371; // Earth's radius in km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

export const Recommend = ({lots, setLots} : {lots:Lot[],setLots: (lots: Lot[]) => void}) => {

    const DEFAULT_LAT = parseFloat(process.env.NEXT_PUBLIC_DEFAULT_LAT!)
    const DEFAULT_LON = parseFloat(process.env.NEXT_PUBLIC_DEFAULT_LON!)  //what is the significane of !

    const [showAllLots, setShowAllLots] = useState<boolean>(false);
    const [loading,setLoading] = useState<boolean>(false);
    const [recommended, setRecommended] = useState<Lot[]>([])

    useEffect(() => {
        const fetchLots = async () => {
            try {
            setLoading(true);
            const res = await axios.get("/api/parking-lot/allLots")
            const fetchedLots: Lot[] = res.data.allLots;

            const lotsWithDistance = fetchedLots.map((lot) => ({
                ...lot,
                distance: getDistanceKm(DEFAULT_LAT, DEFAULT_LON, lot.latitude, lot.longitude)
            })).sort((a, b) => a.distance! - b.distance!);

            setLots(lotsWithDistance);                        // parent's state (for map)
            setRecommended(lotsWithDistance.slice(0, 3));     // local (for cards)

            } finally {
            setLoading(false)
            }
        }
        fetchLots()
    }, [])

    return <div>
        <div className="max-w-7xl mx-auto px-6 py-10">
            <div className="space-y-5">
                {/* heading div */}
                <div className="flex  justify-between">
                    <div className="space-y-2">
                        <h1 className="text-2xl md:text-3xl font-bold ">Recommended for you</h1>
                        <p className="text-stone-600">Based on your location and preferences</p>
                    </div>
                    <button onClick={() => {
                        setShowAllLots(true);
                    }} className="flex gap-2 items-center cursor-pointer  rounded-lg  text-primary transition-all duration-200 group">
                        <span className="text-sm font-semibold group-hover:-translate-x-1 transition-all duration-300 ease-in-out">View All Lots</span>
                        <ArrowRight className="w-4 h-4"/>
                    </button>
                </div>

                {/* first two recommended lots are rendered here */}
                {!loading ? <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5 ">
                    {recommended.map((lot : any, index) => (
                        <div key={lot.id}>
                            <LotInfoCard index={index} id={lot.id} isActive={lot.isActive} ownerId={lot.ownerId} type="full" name={lot.name} lotCapacity={lot.lotCapacity} pricePerHour={lot.pricePerHour} address={lot.address} distance={lot.distance ?? 0}/>
                        </div>
                    ))}
                </div> : <div className="flex justify-center items-center py-[100px] animate-pulse text-xl font-semibold ">Loading the lots....</div>}

                {showAllLots && (
                    <div className="fixed inset-0 bg-black/20 z-1050 flex items-center justify-center p-4 py-10">
                        <div className="bg-white max-w-4xl max-h-[80vh] overflow-y-auto rounded-2xl w-full shadow-2xl">
                            <div className="">
                                <div className="flex justify-between items-center px-8 py-6 sticky top-0 bg-white border-b ">
                                    <div className="space-y-1 z-50">
                                        <h1 className="font-semibold text-2xl">All Available Lots</h1>
                                        <p className="text-sm text-stone-600">5 parking lots in your area</p>
                                    </div>
                                    <button className="cursor-pointer hover:bg-stone-400/20 p-2 rounded-lg" onClick={() => {setShowAllLots(false)}}>
                                     <X/>
                                    </button>
                                </div>

                                {/* render all the lots in this section */}
                                <div className="px-8 py-6 space-y-5 ">
                                    {lots.map((lot : any, index) => (
                                        <div key={lot.id}>
                                            <LotInfoCard index={index} id={lot.id} isActive={lot.isActive} ownerId={lot.ownerId} name={lot.name} lotCapacity={lot.lotCapacity} pricePerHour={lot.pricePerHour} address={lot.address} distance={lot.distance ?? 0}/>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    </div>
}