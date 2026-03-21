import { FilePenLine, MapPin } from "lucide-react"

interface heroProps {
    name:string
    address:string
}

export const HeroSection = ({name,address}:heroProps) => {
 return <div className="max-w-7xl mx-auto px-6 py-5">
    <div className="justify-between flex items-center">
        <div className="space-y-1">
            <h1 className="text-4xl font-semibold">{name}</h1>
            <p className="flex items-center text-stone-600">
                <MapPin className="w-4 h-4 "/>
                <span className="text-sm font-medium ">{address}</span>
            </p>
        </div>
        <button className="flex items-center gap-2 text-white bg-primary px-4 py-3 rounded-xl font-semibold cursor-pointer hover:bg-primary-container shadow-lg shadow-primary/20">
            <FilePenLine/>
            <span>Edit Lot</span>
        </button>
    </div>
 </div>
}