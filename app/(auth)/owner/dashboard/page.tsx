"use client"

import { Dashboard } from "@/components/owner/dashboard";
import { SetUp } from "@/components/owner/setUp";
import axios from "axios";
import { useEffect, useState } from "react";



export default () => {

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
        return <div>Loading...</div>
    }

    if(!lot) {
        return <SetUp/>
    }

    return <div>
        <Dashboard createdAt={date} lotName={lot.name} lotCapacity={lot.lotCapacity} latitude={lot.latitude} longitude={lot.longitude} pricePerHour={lot.pricePerHour} address={lot.address}/>
    </div>
}



