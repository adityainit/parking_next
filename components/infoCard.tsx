import { IndianRupee, SquareParking, Users } from "lucide-react"

interface infoProps {
    heading: string
    value: number
    subHeading: string
    symbol?: boolean
    type?: string
}

export const InfoCard = (props : infoProps) => {
    return <div className="p-3 rounded-lg bg-white shadow-md hover:shadow-lg">
        <div className="flex justify-between">
            <div className="space-y-2">
                <h1 className="text-stone-600 text-sm font-semibold">{props.heading}</h1>
                <div className="flex">
                    <p className="font-bold text-3xl">{props.symbol && "₹"}{props.value}</p>
                </div>
                <p className="text-xs font-light">{props.subHeading}</p>
            </div>
            {props.type == "1" && <SquareParking className="text-emerald-500"/>}
            {props.type == "2" && <Users className="text-emerald-500"/>}
            {props.type == "3" && <IndianRupee className="text-emerald-500"/>}
        
        </div>
    </div>
}