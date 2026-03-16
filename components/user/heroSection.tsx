"use client"

import { useEffect, useState } from "react"

export const HeroSection = () => {

    const [location, setLocation] = useState<string>("Detecting location...")

    useEffect(() => {
        if(!navigator.geolocation) {
            setLocation("Geolocation not supported");
            return;
        }

        navigator.geolocation.getCurrentPosition(
            async(position) => {
                console.log(position.coords);
                const { latitude, longitude } = position.coords;

                try {
                    const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`);
                    const data = await res.json();

                    const city = 
                        data.address.city ||
                        data.address.town ||
                        data.address.village ||
                        data.address.state;
                    setLocation(`${city}, ${data.address.country}`)
                } catch (err) {
                    setLocation("Unable to fetch location");
                }
            },
            
            () => {
                setLocation("Location permission denied")
            }
        )
    }, [])

    return <div className="bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-600 ">
        <div className="max-w-7xl px-6 py-15 mx-auto">
            <div>
                {/* herotext div */}
                <div className="space-y-10">
                    <div className="text-center space-y-2">
                        <h1 className="font-bold text-4xl md:text-5xl text-white">Find Your Perfect Spot</h1>
                        <p className="md:text-lg text-white font-light">Locate the nearest parking lot and reserve your space instantly</p>
                    </div>


                    <div className="bg-white p-5 rounded-lg py-30 flex justify-center">
                        get the map rendered here with all the lots market -- 
                        {location}
                    </div>
                </div>
            </div>
        </div>
    </div>
}