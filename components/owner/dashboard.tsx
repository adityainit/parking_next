import { Calendar, IndianRupee, MapPin } from "lucide-react"
import { InfoCard } from "../infoCard"

interface dashboardProps {
    lotName: string
    pricePerHour: number
    lotCapacity: number
    latitude: number
    longitude: number
    address: string
    createdAt: string

}

export const Dashboard = (props : dashboardProps) => {
    return <div className="bg-gradient-to-r from-stone-100 via-emerald-200/20 to-stone-100 py-10 px-6">
        <div className="">

            <div className="max-w-7xl mx-auto space-y-10">
                {/* 1st card imo with the lot name */}
                <div className="md:flex space-y-4 justify-between items-center  border bg-white  py-4 px-6 rounded-lg shadow-md hover:shadow-lg">
                    <div className="grid grid-cols-l space-y-2">
                        <h1 className="text-3xl font-semibold">{props.lotName}</h1>
                        <p className="flex items-center text-stone-500 gap-1">
                            <MapPin className="w-5 h-5"/>
                            <span className="">{props.address}</span>
                        </p>
                        <p className="border rounded-full px-4 text-sm py-1 w-fit bg-emerald-200/20 font-semibold text-emerald-700">Active</p>
                    </div>

                        <button className="bg-gradient-to-r from-emerald-500 to-teal-500 px-4 md:py-2 py-1 rounded-md text-white
                        font-bold md:text-lg cursor-pointer hover:shadow-lg hover:shadow-emerald-200">Edit Lot</button>
                </div>

                {/* 2nd card with the 4 cards within it */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
                    <InfoCard type="1" heading="Total Capacity" value={props.lotCapacity} subHeading="Total spaces"/>
                    <InfoCard type="2" heading="Occupied Spots" value={0} subHeading="Active Sessions"/>
                    <InfoCard type="1" heading="Available Spots" value={0} subHeading="Ready to use"/>
                    <InfoCard type="3" symbol={true} heading="Todays's Revenue" value={0} subHeading="Earnings today"/>
                </div>

                {/* parking lot information */}

                <div className="bg-white py-4 px-6 grid grid-cols-1 space-y-5">
                    <h1 className="text-xl font-bold">Parking Lot Information</h1>
                    <div className="md:flex justify-between">
                        <div className="space-y-4">
                            <div className="flex gap-2 items-center ">
                                <IndianRupee className="text-emerald-500"/>
                                <div>
                                    <p className="text-stone-600">Price per Hour</p>
                                    <p className="font-semibold text-lg">₹{props.pricePerHour}/hour</p>
                                </div>
                            </div>

                            <div className="flex gap-2 items-center ">
                                <Calendar className="text-emerald-500"/>
                                <div>
                                    <p className="text-stone-600">Created Date</p>
                                    <p className="font-semibold text-lg">{props.createdAt}</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-emerald-200/20 p-10 flex items-center justify-center">
                            RenderMap
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>
}
