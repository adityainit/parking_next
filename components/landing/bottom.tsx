import { SignedIn, SignedOut, SignUpButton } from "@clerk/nextjs"


export const Bottom = () => {
    return <div className="bg-gradient-to-r from-stone-100 via-emerald-200/20 to-stone-100 ">
        <div className="px-6 max-w-7xl py-20 md:py-25 mx-auto">
            <div className="space-y-6 text-center">

                <h1 className="text-4xl md:text-5xl font-bold">Ready to transform parking?</h1>

                <p className="text-xl text-stone-600">Connecting drivers and parking owners through automation, data, and intelligent access control.</p>

                <div className="mt-15 flex justify-center md:flex gap-10">
                    <SignedOut>
                        <SignUpButton mode="redirect" forceRedirectUrl="/onboarding?role=USER">
                            <button className="text-white bg-gradient-to-r from-emerald-600 to-teal-600 px-8 py-4 text-lg rounded-lg hover:shadow-lg hover:shadow-emerald-600/20 font-semibold transition-all duration-200 ease-in-out cursor-pointer">
                                <span>Signup as user</span>
                            </button>
                        </SignUpButton>
                        <SignUpButton mode="redirect" forceRedirectUrl="/onboarding?role=OWNER">
                            <button className="text-white bg-gradient-to-r from-emerald-600 to-teal-600 px-8 py-4 text-lg rounded-lg hover:shadow-lg hover:shadow-emerald-600/20 font-semibold transition-all duration-200 ease-in-out cursor-pointer">
                                <span>Signup as owner</span>
                            </button>
                        </SignUpButton>
                    </SignedOut>

                    <SignedIn>

                        <h1  className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent cursor-pointer">Explore the role based dashboard</h1>

                    </SignedIn>
                    

                    {/* <button className="text-white bg-gradient-to-r from-emerald-600 to-teal-600 px-8 py-4 text-lg rounded-lg hover:shadow-lg hover:shadow-emerald-600/20 font-semibold transition-all duration-200 ease-in-out cursor-pointer">
                        <span>Login as a owner</span>
                    </button> */}

                </div>

                <p className="text-stone-600 mt-10">Built for modern cities and scalable infrastructure.</p>

            </div>
        </div>
    </div>
}