"use client"

import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

import axios from "axios"
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export default function Onboarding() {
    const searchParams = useSearchParams();
    const role = searchParams.get("role");
    const { isLoaded, isSignedIn } = useUser();

    const router = useRouter();

    useEffect(() => {
        if(!role || !isSignedIn || !isLoaded) return;

        const fetch = async () => {
            await axios.post("/api/account/sync", {role});

            if(role === "OWNER") {
                router.push("/owner/dashboard");
            } else {
                router.push("/dashboard")
            }
        }

        fetch();

    },[role, isLoaded, isSignedIn, router]);

    return <div className="flex items-center h-[500px] justify-center animate-pulse text-3xl font-semibold ">
        Setting up your account....
    </div>
}