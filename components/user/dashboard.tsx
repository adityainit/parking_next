import { ActiveSession } from "./activeSession"
import { HeroSection } from "./heroSection"
import { Recommend } from "./recommend"


export const UserDashboard = () => {
    return <div className="">
        <HeroSection/>
        <Recommend/>
        <ActiveSession/>
    </div>
}