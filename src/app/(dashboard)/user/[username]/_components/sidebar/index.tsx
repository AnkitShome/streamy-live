"use client"

import { Button } from "@/components/ui/button";
import { useCreatorSidebar } from "@/store/creator-sidebar-store"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Navigation } from "./navigation";

export const Sidebar = () => {
   const { isOpen, close, open, toggle } = useCreatorSidebar();

   return (
      <aside className={`h-screen bg-slate-800 text-white border-r border-slate-700 flex flex-col transition-all duration-300 ease-in-out
      ${isOpen ? "w-64" : "w-16"}`}>
         {/*Toggle button */}

         <div className="flex items-center justify-end p-2">
            {isOpen ? (
               <button className="p-2 rounded hover:bg-slate-700"
                  onClick={close}>
                  <ChevronLeft size={20} />
               </button>
            ) : (
               <button className="p-2 rounded hover:bg-slate-700"
                  onClick={open}>
                  <ChevronRight size={20} />
               </button>
            )}
         </div>
         {/*Navigation*/}
         <Navigation isOpen={isOpen} />

      </aside>
   )
}