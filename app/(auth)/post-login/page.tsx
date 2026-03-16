"use client"

import axios from "axios"
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function PostLogin () {

    const router = useRouter()

    useEffect(() => {
        const fetchRole = async () => {
            const res = await axios.get("/api/account/me");
            const role = res.data.role;


            if(role === "USER") {
                router.push("/dashboard")
            } else if ( role === "OWNER") {
                router.push("/owner/dashboard")
            }
        }
        fetchRole()
    },[])
    return <div>
        Configuring your dashboard based on the role
    </div>
}
