import { Role } from "@/app/generated/prisma/enums";
import { getCurrentAccount } from "./getCurrentAcc";
import { NextResponse } from "next/server";


export const requireRole = async (requiredRole : Role) => {
    const account = await getCurrentAccount();

    if(!account) {
        return {
            error: NextResponse.json({error: "Unauthorized"}, {status: 401})
        }
    }

    if(account.role !== requiredRole) {
        return {
            error: NextResponse.json({error: "Forbidden"}, {status: 401})
        }
    }

    return { account };
}

