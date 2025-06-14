"use client"
import Link from "next/link"
import { SignedIn, SignedOut, SignInButton, UserButton, useUser } from "@clerk/nextjs"
import { Clapperboard } from "lucide-react"


export default function Actions() {
   const { user } = useUser()
   return (
      <div className="flex items-center gap-4">
         <SignedOut>
            <SignInButton>
               <button className="px-4 py-2 text-sm font-medium text-slate-300 hover:text-white bg-slate-800/50 hover:bg-slate-700/50 rounded-lg border border-slate-700/50 hover:border-slate-600/50 transition-all duration-200">
                  Sign In
               </button>
            </SignInButton>
         </SignedOut>

         <SignedIn>
            <Link href={`/user/${user?.username || user?.primaryEmailAddress?.emailAddress}`} className="flex justify-between gap-x-2">
               <Clapperboard className="text-white h-6 w-6" />
               <span className="hidden lg:block spanx-2 text-white font-light text-m font">Dashboard</span>
            </Link>

            <div className="p-1 rounded-full bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/30">
               <UserButton
                  afterSignOutUrl="/"
                  appearance={{
                     elements: {
                        avatarBox: "w-8 h-8",
                     },
                  }}
               />
            </div>
         </SignedIn>
      </div >
   )
}
