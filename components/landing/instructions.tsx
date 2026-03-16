import { TrendingUp } from "lucide-react"

const steps = [
  {
    title: "Search",
    description: "User opens app and searches for nearby parking lots with real-time availability."
  },
  {
    title: "Reserve",
    description: "User reserves a spot and subscribes to parking owner (or pays per-use)."
  },
  {
    title: "Enter",
    description: "RFID tag automatically registers vehicle entry. Gate opens seamlessly without manual intervention."
  },
  {
    title: "Exit & Billing",
    description: "RFID exit triggers automatic fare calculation. Instant digital invoice sent."
  }
]

const ownerBenefits = [
  "Maximize occupancy with real-time pricing",
  "Reduce operational costs with automation",
  "Subscriber management and recurring revenue",
  "Detailed analytics and business insights"
]

const userBenefits = [
  "Find parking in seconds, not minutes",
  "Zero friction entry and exit experience",
  "Subscription plans for frequent parkers",
  "Transparent pricing and instant receipts"
]

export const Instructions = () => {
    return <div className="">
        <div className="max-w-7xl mx-auto py-30 px-6">
            <div className="">
                <div className="text-center space-y-4 mb-20">
                    <h1 className="font-bold text-4xl md:text-5xl">How it works</h1>
                    <p className="text-stone-600 text-xl mx-auto">Four Simple steps from search to parking</p>
                </div>

                <div className="grid md:grid-cols-4 gap-5">
                    {steps.map((step,index) => (
                        <div key={index} className="space-y-3">
                            <div className="flex items-center gap-3">
                                <p className="flex-shrink-0 border w-10 h-10 rounded-full text-white bg-gradient-to-r from-emerald-600 to-teal-600 flex items-center justify-center font-bold shadow-lg shadow-emerald-600/20 ">
                                    {index+1}
                                </p>
                                <h1 className="font-semibold text-lg">{step.title}</h1>
                            </div>
                            <div>
                                <p className="ext-sm text-stone-600">{step.description}</p>
                            </div>
                        </div>

                    ))}

                </div>

                <div className=" ">
                    <div className="grid md:grid-cols-2 gap-10 mt-20 border px-20 py-15 rounded-xl border-emerald-200 bg-gradient-to-r from-emerald-50 via-teal-50 to-blue-50">
                        <div className="space-y-4">
                            <h1 className="font-semibold text-3xl">For Parking Owners</h1>
                            <div className="space-y-2">

                                {ownerBenefits.map((benefit, index) => (
                                    <div key={index} className="flex gap-2">
                                        <div className="w-5 h-5 rounded-full bg-emerald-600 flex items-center justify-center flex-shrink-0">
                                            <TrendingUp className="w-3 h-3 text-white" />
                                        </div>
                                        <p className="text-stone-600">{benefit}</p>
                                    </div>
                                ))}

                                
                            </div>
                        </div>

                        <div className="space-y-4">
                            <h1 className="font-semibold text-3xl">For Users</h1>
                            <div className="space-y-2">

                                {userBenefits.map((benifit,index) => (
                                    <div key={index} className="flex gap-2">
                                        <div className="w-5 h-5 rounded-full bg-emerald-600 flex items-center justify-center flex-shrink-0">
                                           <TrendingUp className="w-3 h-3 text-white" /> 
                                        </div>
                                        <p className="text-stone-600">{benifit}</p>
                                    </div>
                                ))}
                                
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
}