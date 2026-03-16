
import { z } from "zod";

export const lotSchema = z.object({
    name: z
        .string({message:"*Name is required"})
        .min(10, {message:"Must contain atleast 10 Characters"})
        .max(60, {message:"Must be less than 60"}),

    address: z
        .string({message:"*Adress is required"})
        .min(10, {message:"Must contain atleast 30 Characters"})
        .max(60, {message:"Must be less than 60"}),

    lotCapacity: z
        .number({message:"*Lot Capacity is required"})
        .min(10, {message:"Atleast 10"}),

    pricePerHour: z
        .number({message: "*Required"}),

    longitude: z.number(),
    latitude: z.number()
    
})

export type LotForm = z.infer<typeof lotSchema>