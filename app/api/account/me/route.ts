import { getCurrentAccount } from "@/lib/getCurrentAcc";
import { NextResponse } from "next/server";


export async function GET () {

    try{
        const account = await getCurrentAccount();
        if(!account) {
            return NextResponse.json(
                {error:"Unauthorized"},
                {status: 401}
            )
        } 
        return NextResponse.json(
            {role: account.role},
            {status:200}
        )
    } catch (err) {
        console.error(err);
        return NextResponse.json(
            {error: "Internal server error from api/account/me"},
            {status:500}
        )
    }

}