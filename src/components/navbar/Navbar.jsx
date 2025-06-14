"use client"

import { UserButton, SignedIn, SignedOut, SignInButton } from "@clerk/nextjs"
import Link from "next/link"

export default function Navbar() {
   return (
      <header className="flex justify-between items-center py-4 px-6 border-b bg-white shadow-sm">
         <Link href="/" className="text-xl font-bold text-purple-700">
            Streamy
         </Link>
         <div className="flex items-center gap-4">
            <SignedOut>
               <SignInButton>
                  <button className="text-purple-700 font-medium hover:underline">Log in</button>
               </SignInButton>
            </SignedOut>
            <SignedIn>
               <UserButton afterSignOutUrl="/" />
            </SignedIn>
         </div>
      </header>
   )
}