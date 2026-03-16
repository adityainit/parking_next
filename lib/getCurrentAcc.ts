import { auth } from "@clerk/nextjs/server";
import prisma from "./prisma"

export const getCurrentAccount = async () => {
    const {userId} = await auth();

    if(!userId) {
        return null;
    }

    const account = await prisma.account.findUnique({
        where:{clerkId:userId}
    })


    return account;
}