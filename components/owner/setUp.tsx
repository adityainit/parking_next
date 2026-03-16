"use client"

import { MapPin,Save } from "lucide-react"
import { useRouter } from "next/navigation"

import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { Input } from "../input";

import dynamic from "next/dynamic";

const MapSelector = dynamic(
  () => import("./mapSelector").then((mod) => mod.MapSelector),
  { ssr: false }
);

import { lotSchema, LotForm } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod"
import axios from "axios";

export const SetUp = () => {
    const router = useRouter();
    return <div className="h-[500px] ">
        <div className="flex items-center justify-center h-full px-10">
            <div className="text-center max-w-[500px] space-y-3">
                <div className=" w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto ">
                    <MapPin className="w-10 h-10 text-emerald-600"/>
                </div>
                <h1 className="text-3xl font-bold">Set up your parking lot</h1>
                <p className="text-stone-600">Add your parking lot details, set pricing, and start managing users. You'll be able to pinpoint the exact location on a map.</p>
                <button onClick={() => {
                    router.push("/owner/inpForm")
                }} className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-8 py-3 text-lg font-semibold rounded-lg mt-5 cursor-pointer hover:shadow-lg hover:shadow-emerald-600/20">
                    Create Parking Lot
                </button>
            </div>
        </div>
    </div>
}


export const InpField = () => {

    const router = useRouter();

    const {register, handleSubmit,  formState:{errors}, setValue} = useForm<LotForm>({resolver: zodResolver(lotSchema)})

    const onSubmit: SubmitHandler<LotForm> = async (data) => {
        console.log("Submitt triggered")
        console.log("Form Data:",data)
        const res = await axios.post("/api/owner/parking-lot", data)
        console.log("data sent")
        router.push("/owner/dashboard")
    }
    
    return <div className="px-6 pt-10 ">
        <div className="max-w-7xl mx-auto py-6 px-7 rounded-lg border bg-white shadow-lg">
            <div className="space-y-5">
                <div className="flex items-center gap-2">
                    <MapPin/>
                    <h1 className="font-semibold text-xl">Set Up your parking lot</h1>
                </div>

                <div className="">
                    <form onSubmit={handleSubmit(onSubmit)} className="flex gap-5 flex-col">

                        <fieldset className="grid grid-cols-2 gap-x-10 gap-y-5">
                            <div>
                                <Input
                                    label="Parking Lot Name*"
                                    placeholder="e.g., DownTown Garage"
                                    type="text"
                                    name="name"
                                    register={register}
                                />
                                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}

                            </div>

                            <div>
                                <Input
                                    label="Address"
                                    placeholder="e.g., 123 Main Street"
                                    type="text"
                                    name="address"
                                    register={register}
                                />
                            </div>

                            <div>
                                <Input
                                    label="Lot Capacity*"
                                    placeholder="e.g., 50"
                                    type="number"
                                    name="lotCapacity"
                                    register={register}
                                    options={{valueAsNumber: true }}
                                />
                            </div>

                            <div>
                                <Input
                                    label="Price Per Hour*"
                                    placeholder="e.g., "
                                    type="number"
                                    name="pricePerHour"
                                    register={register}
                                    options={{valueAsNumber : true, step: 0.01}}
                                />
                            </div>
                        </fieldset>

                        <fieldset className="border-b pb-4">
                            <h1 className="font-semibold">Location on Map</h1>
                            <div className="border flex justify-center items-center p-5 bg-stone-300/20">
                                <MapSelector
                                onLocationSelect={(lat, lng) => {
                                    setValue("latitude", lat);
                                    setValue("longitude", lng);
                                }}
                                />
                            </div>
                        </fieldset>

                        <div className="grid grid-cols-2 gap-4">
                            <button type="button" className="border py-3 font-semibold text-lg rounded-lg cursor-pointer hover:bg-stone-200/20">Cancel</button>
                            <button type="submit" className="border bg-gradient-to-r from-emerald-600 to-teal-600 cursor-pointer rounded-lg hover:shadow-lg hover:shadow-emerald-600/20">
                                <div className="flex justify-center gap-2 items-center text-white ">
                                    <Save/>
                                    <span className="font-semibold text-lg">Create Lot</span>
                                </div>
                            </button>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    </div>
}
