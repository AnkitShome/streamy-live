"use client"

import Link from "next/link"

import Actions from "./actions"

export const Navbar = () => {
   return (
      <header className="flex items-center justify-between px-6 py-4 border-b border-slate-800/50 bg-slate-900/95 backdrop-blur-md sticky top-0 z-50">
         {/* Logo / Home Link */}
         <div className="flex items-center space-x-2">
            <Link
               href="/"
               className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent hover:from-cyan-300 hover:to-blue-400 transition-all duration-200"
            >
               Streamy
            </Link>
            <div className="text-sm mt-1 ml-3 text-slate-300 ">Creator Dashboard</div>
         </div>

         <Actions />

      </header>
   )
}
