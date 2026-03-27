import { ExternalLink, Info } from "lucide-react"
import dynamic from "next/dynamic"

const SinglePinMap = dynamic(() => import("./lotMap").then(m => m.SinglePinMap), {
  ssr: false,
  loading: () => <div className="h-[400px] animate-pulse bg-gray-200 rounded-xl"/>
})

interface lotInfoProps {
    pricePerHour: number
    createdAt: string
    longitude: number
    latitude: number
    name: string
    address: string
}

export const LotInfo = ({pricePerHour,createdAt,longitude,latitude,name,address}: lotInfoProps) => {

    const formatCoords = (lat: number , lon: number) => {
        const latDir = lat >= 0 ? "N" : "S"
        const lonDir = lon >= 0 ? "E" : "W"
        return `${Math.abs(lat).toFixed(4)}° ${latDir}, ${Math.abs(lon).toFixed(4)}° ${lonDir}`
    }

    const params = [
        {name:"Price per hour", value:`₹${pricePerHour}/hour`},
        {name:"Created Date" , value:new Date(createdAt).toLocaleDateString("en-IN",{
            month:"short",
            day:"2-digit",
            year:"numeric"
        })},
        {name:"Operating Hours", value:"24 / 7"}
    ]

    return <div className="px-6 max-w-7xl mx-auto">
        <div className="md:flex gap-6">
            <div className="bg-surface-container-low p-6 md:w-[30%] min-w-xs space-y-6 rounded-xl">
                <h1 className="text-xl font-medium">Lot Information</h1>
                <div className="">
                    {params.map((param) => (
                        <div className="flex justify-between text-lg border-b py-5" key={param.name}>
                            <p className="text-stone-700">{param.name}</p>
                            <p className="font-medium">{param.value}</p>
                        </div>
                    ))}
                </div>
                <div className="flex items-center gap-4 border p-6 text-primary rounded-lg bg-green-300/10 border-primary/20">
                    <Info className="w-10 "/>
                    <p className="text-sm font-medium">Live data. Sessions and availability update in real time.</p>
                </div>
            </div>

            <div className="md:flex-1 rounded-xl overflow-hidden relative">
                <SinglePinMap latitude={latitude} longitude={longitude} name={name} address={address}/>
                <div>
                    <div className="flex gap-3 items-center absolute z-1000 top-4 right-4 bg-white px-5 py-4 rounded-lg">
                        <p className="rounded-full bg-primary text-white px-3 py-1 font-extrabold text-3xl">P</p>
                        <div className="">
                            <p className="text-xs font-medium">LOCATION CORDINATES</p>
                            <h1 className="font-bold">{formatCoords(latitude,longitude)}</h1>
                        </div>
                    </div>
                    <a href={`https://www.google.com/maps?q=${latitude},${longitude}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex gap-2 items-center absolute z-[1000] bottom-4 right-4 bg-white px-4 py-3 rounded-lg shadow-md hover:shadow-lg transition-all"
                    >
                        <ExternalLink className="w-4 h-4 text-teal-700"/>
                        <p className="text-sm font-semibold text-teal-700">Open in Maps</p>
                    </a>
                </div>
            </div>
        </div>
    </div>
}