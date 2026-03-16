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
}

export const Recommend = () => {

    const [showAllLots, setShowAllLots] = useState<boolean>(false);
    const [allLots, setAllLots] = useState<Lot[]>([]);
    const [loading,setLoading] = useState<boolean>(false);

    useEffect(() => {
        const fetchLots = async () => {
            try{
                setLoading(true);
                const res = await axios.get("/api/parking-lot/allLots")
                setAllLots(res.data.allLots);
            } finally {
                setLoading(false)
            }
        }
        fetchLots()
   },[])

    return <div>
        <div className="max-w-7xl mx-auto px-6 py-10">
            <div className="space-y-5">
                {/* heading div */}
                <div className="flex justify-between">
                    <div className="space-y-2">
                        <h1 className="text-2xl md:text-3xl font-bold ">Recommended for you</h1>
                        <p className="text-stone-600">Based on your location and preferences</p>
                    </div>
                    <button onClick={() => {
                        setShowAllLots(true);
                    }} className="flex gap-3 items-center cursor-pointer border rounded-lg px-3  md:px-6 md:py-3 text-emerald-600 hover:text-emerald-700 hover:bg-emerald-100 transition-all duration-200">
                        <span className=" font-medium">View All Lots</span>
                        <ArrowRight className="w-4 h-4"/>
                    </button>
                </div>

                {/* first two recommended lots are rendered here */}
                {!loading ? <div className="grid md:grid-cols-2 gap-5 lg:gap-20">
                    {allLots.map((lot : any) => (
                        <div key={lot.id}>
                            <LotInfoCard id={lot.id} isActive={lot.isActive} ownerId={lot.ownerId} type="full" name={lot.name} lotCapacity={lot.lotCapacity} pricePerHour={lot.pricePerHour} address={lot.address} distance={0}/>
                        </div>
                    ))}
                </div> : <div className="flex justify-center items-center py-[100px] animate-pulse text-xl font-semibold ">Loading the lots....</div>}

                {showAllLots && (
                    <div className="fixed inset-0 bg-black/20 z-50 flex items-center justify-center p-4 py-10">
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
                                    {allLots.map((lot : any) => (
                                        <div key={lot.id}>
                                            <LotInfoCard id={lot.id} isActive={lot.isActive} ownerId={lot.ownerId} name={lot.name} lotCapacity={lot.lotCapacity} pricePerHour={lot.pricePerHour} address={lot.address} distance={0}/>
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