import { Bottom } from "@/components/landing/bottom";
import { HeroSection } from "@/components/landing/heroSection";
import { Instructions } from "@/components/landing/instructions";
import { Navbar } from "@/components/navbar";


const Home = () => {
  return <div className="">
    <HeroSection/>
    <Instructions/>
    <Bottom/>
  </div>
}

export default Home;