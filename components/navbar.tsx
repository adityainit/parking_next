"use client"
import { cn } from "@/lib/utils"
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs"
import axios from "axios"
import { Radio } from "lucide-react"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"

export const Navbar = () => {

    const pathname = usePathname();
    const [role,setRole] = useState<string>();
    const [loading,setLoading] = useState<boolean>(false);
    useEffect(() => {
        const fetchRole = async () => {
            try {
                setLoading(true);
                const res = await axios.get("/api/account/me");
                setRole(res.data.role);
                console.log(res.data.role)
            } catch(err) {
                console.error(err);
            } finally {
                setLoading(false)
            }
        }
        fetchRole();

    },[])

    return <div className="sticky top-0 left-0 right-0 z-40 border-b  backdrop-blur-xl bg-white/70">
            <div className="flex max-w-7xl mx-auto justify-between py-5 px-6">
                <div className="flex items-center gap-1">
                    <div className="w-10 h-10 bg-gradient-to-br from-emerald-600 to-teal-700 rounded-lg flex items-center justify-center shadow-lg shadow-emerald-600/20">
                        <Radio className="w-5 h-5 text-white"/>
                    </div>
                <Link href={"/"} className="bg-gradient-to-br from-emerald-600 to-teal-700 bg-clip-text font-bold text-2xl text-transparent">SmartPark</Link>
                </div>

                <div className="hidden md:flex gap-8 items-center ">
                    {[
                        {name: "Features", path:"/features"},
                        {name: "How it works", path:"/howItWorks"},
                        {name: "Pricing", path: "/pricing"},
                        // {name: "Dashboard", path: role === "USER" ? "/dashboard" : "/owner/dashboard"}

                    ].map((item) => (
                        <Link key={item.path} href={item.path}>
                            <div className={cn(
                                "transition-all duration-200 text-stone-600 hover:text-emerald-600",
                                pathname == item.path ? "text-emerald-600" : "text-stone-600")}
                            >
                                {item.name}
                            </div>
                        </Link>
                    ))}

                    <div className="grid">
                        <SignedOut >
                            <SignInButton mode="redirect" forceRedirectUrl="/post-login">
                                <button className="border px-5 py-3 rounded-lg border-stone-400 cursor-pointer hover:border-emerald-400 hover:bg-emerald-50 transition-all duration-200 ease-in-out font-semibold text-stone-600">
                                    Log In
                                </button>
                            </SignInButton>
                        </SignedOut>
                        <SignedIn >
                            <div className="flex gap-8 items-center">
                                <Link href={role === "USER" ? "/dashboard" : "/owner/dashboard"}>
                                    {!loading && <div className={cn(
                                    "transition-all duration-200 text-stone-600 hover:text-emerald-600",
                                    pathname.includes("dashboard") ? "text-emerald-600" : "text-stone-600"
                                    )}>
                                        Dashboard
                                    </div>}
                                    </Link>
                                <UserButton/>
                            </div>
                        </SignedIn>
                    </div>
                </div>
            </div>
    </div>
}

