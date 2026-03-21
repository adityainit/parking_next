"use client"

import { useEffect, useState } from "react"
import dynamic from "next/dynamic"
import { Search } from "lucide-react"

type Lot = {
    id: number
    name: string
    address: string
    latitude: number
    longitude: number
}

const LotsMap = dynamic(() => import("./lotsMap").then(m => m.LotsMap), {
  ssr: false,
  loading: () => <div className="h-[400px] flex items-center justify-center animate-pulse">Loading map...</div>
})


export const HeroSection = ({lots} : {lots: Lot[]}) => {

    

    return <div className=" ">
        <div className="max-w-7xl px-6 py-15 mx-auto">
            <div>
                {/* herotext div */}
                <div className="space-y-10">
                    <div className="text-center space-y-2">
                        <h1 className="font-bold text-4xl md:text-5xl ">Find Your Perfect Spot</h1>
                        <p className="md:text-lg font-light">Locate the Precision parking for the modern urban explorer. Secure your space in seconds.</p>
                    </div>

                    <div className="relative">
                        <div>
                            <div className="absolute top-10  z-[1000] w-[300px] md:w-[500px] left-1/2 -translate-x-1/2  ">
                                <div className="bg-white rounded-full px-5 py-4 flex items-center  gap-2 shadow-xl relative ">
                                    <Search/>
                                    <input className="w-full outline-none flex text-sm md:text-base" type="text" placeholder="Search by destination or landmark" />
                                    <div className="absolute right-2 hidden md:block">
                                        <button className="rounded-full bg-primary hover:bg-primary-container cursor-pointer text-white font-semibold px-7 py-2">Explore</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="rounded-2xl overflow-hidden shadow-xl">
                            {/* <LotsMap lots={lots}/> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
}