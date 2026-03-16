import { ChevronRight, Sparkles } from "lucide-react"

export const HeroSection = () => {

    // subject-b
    return <div className="relative bg-gradient-to-b from-stone-100 via-emerald-200/20 to-stone-100 flex ">
        

       {/* subject-a  */}
    <div className="max-w-7xl px-6 mx-auto py-10 md:py-20 md:pb-39">
        
        {/* focus this div */}
        <div className="space-y-5 grid md:grid-cols-2  w-full  items-center gap-32">

            {/* child-1 */}
            <div className="space-y-8">
                <div className="inline-flex border rounded-full items-center bg-emerald-50 text-emerald-700 px-3.5 py-2 space-x-2">
                    <Sparkles className="w-3.5 h-3.5"/>
                    <p>Intelligent IoT Integration</p>
                </div>

                <div className="space-y-6">
                    <h1 className="text-6xl md:text-7xl font-bold text-stone-900   ">Smart Parking,<br/><span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">seamlessly </span>
                    intelligent</h1>
                

                    <p className="text-xl text-stone-600 leading-relaxed max-w-lg">Connect parking owners and users on one elegant platform. Automated RFID entry/exit, real-time availability, and instant billing.</p>
                </div>

                <div className="flex gap-14">
                    <button className=" text-white bg-gradient-to-r from-emerald-600 to-teal-600 px-8 py-4 text-lg rounded-lg hover:shadow-lg hover:shadow-emerald-600/20 font-semibold transition-all duration-200 ease-in-out">

                        <span>Button </span>

                    </button>
                    <button className="px-8 py-4 border-2 rounded-lg text-lg font-semibold text-stone-700 border-stone-300 hover:border-emerald-400 hover:bg-emerald-50 transition-all duration-200 ease-in-out">
                        <span>Button</span>
                    </button>
                </div>

                <div className="flex border-t border-stone-200 gap-10 pt-8">
                    <div className="border-r pr-8">
                        <p className="text-sm uppercase">Trusted By</p>
                        <p className="font-bold text-2xl">2,500+ operators</p>
                    </div>

                    <div className="">
                        <p className="uppercase text-sm ">Managing</p>
                        <p className="font-bold text-2xl tracking-wider">50k+ spaces</p>
                    </div>
                </div>

                
            </div>


            {/* child-2 */}
            <div className="h-full    max-w-xl">
                <div className="border p-8 rounded-3xl border-stone-200 bg-white shadow-lg space-y-6 h-full flex flex-col justify-center">

                    <div className="flex items-center space-x-3 border-b border-stone-200 pb-4">
                        <div className="border rounded-full w-3 h-3 bg-emerald-500 animate-pulse"></div>
                        <span className="font-semibold">Parking Status</span>
                    </div>

                    
                    {/* dynamic data to be rendered from the database */}
                    <div className="space-y-6 ">
                        <div className="flex justify-between border border-emerald-100 items-center p-4 rounded-xl bg-gradient-to-r from-emerald-50 to-transparent hover:border-emerald-200 transition-all  duration-200 ease-in-out   ">
                            <div>
                                <p className="font-semibold text-sm">Downtown Garage</p>
                                <span className="font-light text-xs text-stone-600">0.8 km away</span>
                            </div>
                            <div>
                                <p className="text-emerald-600 font-bold text-sm">24</p>
                                <p className="text-xs text-stone-600">spaces</p>
                            </div>
                        </div>

                        <div className="flex justify-between items-center p-4 border rounded-xl bg-gradient-to-r from-amber-50 to-transparent border-amber-100 hover:border-amber-200 transition-all  duration-200 ease-in-out">
                            <div>
                                <p className="font-semibold text-sm">Central Parking</p>
                                <span className="text-xs text-stone-600">1.2 km away</span>
                            </div>
                            <div>
                                <p className="font-bold text-sm text-amber-600">3</p>
                                <span className="text-xs text-stone-600">spaces</span>
                            </div>
                        </div>

                        <div className="flex justify-between items-center p-4 border border-red-100 hover:border-red-200 rounded-xl bg-gradient-to-r from-red-50 to-transparent transition-all  duration-200 ease-in-out">
                            <div>
                                <p className="font-semibold text-sm">Airport Lot</p>
                                <span className="text-xs text-stone-600">2.5 km away</span>
                            </div>
                            <div>
                                <p className="text-red-600 text-sm font-bold">0</p>
                                <span className="text-xs text-stone-600">spaces</span>
                            </div>
                        </div>

                    </div>

                    <div className="border-t pt-4 border-stone-300">
                        <button className="flex justify-center items-center gap-2 bg-gradient-to-r from-emerald-600 to-teal-600 text-white w-full font-semibold text-sm py-2.5 rounded-lg hover:shadow-lg hover:shadow-emerald-600/20 transition-all duration-200 ease-in-out">
                            <span>Resrve Spot</span>
                            <ChevronRight className="w-4 h-4" />
                        </button>
                    </div>
                    
                </div>
            </div>

        </div>
        
    </div>
    </div>
}