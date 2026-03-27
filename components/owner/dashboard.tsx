"use client"

import axios from "axios";
import { useEffect, useState } from "react";
import { SetUp } from "./setUp";
import { HeroSection } from "./heroSection";
import {  LotStats } from "./lotStats";
import { LotInfo } from "./lotInfo";
import { LiveSessions } from "./liveSessoins";
import { Subscribers } from "./subscribers";
import { OwnerHistory } from "./ownerHistory";


export const OwnerDashboard = () => {

    const [loading,setLoading] = useState(true);
    const [lot,setLot] = useState<any>(null);
    const [date, setDate] = useState<any>(null);

    useEffect(() => {
        const fetchLot = async () => {
            try {
                const res = await axios.get("/api/parking-lot/existingLot");
                setLot(res.data);
                console.log(res.data)
                const formattedDate = new Date(res.data.createdAt).toLocaleDateString("en-US",{
                    month:"short",
                    day: "2-digit",
                    year: "numeric"
                })
                setDate(formattedDate)
                console.log("hey there",formattedDate)
            } catch (err: any) {
                if(err.response?.status == 404) {
                    setLot(null);
                }
            } finally {
                setLoading(false);
            }
        }
        fetchLot()
    }, [])

    if(loading) {
        return <div className="flex items-center h-[500px] justify-center animate-pulse text-3xl font-semibold ">Loading...</div>
    }

    if(!lot) {
        return <SetUp/>
    }

    return <div className="bg-surface pb-20">
        <HeroSection name={lot.name} address={lot.address}/>
        {/* use the lot info card and send the four props */}
        <LotStats />
        <LotInfo name={lot.name} address={lot.address} pricePerHour={lot.pricePerHour} createdAt={lot.createdAt} latitude={lot.latitude} longitude={lot.longitude}/>
        <LiveSessions pricePerHour={lot.pricePerHour}/>
        <OwnerHistory/>
        <Subscribers/>
    </div>
}