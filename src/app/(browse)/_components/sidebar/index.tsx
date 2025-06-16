"use client";

import { Menu, ArrowLeftToLine } from "lucide-react";
import { useSidebarStore } from "@/store/sidebar-store";
import { Recommended } from "./recommended";
import { Following } from "./following"

export const Sidebar = ({ following, recommended }) => {
   const { isOpen, toggle, close } = useSidebarStore();

   return (
      <aside
         className={`${isOpen ? "w-72" : "w-20"
            } transition-all duration-300 ease-in-out bg-slate-800 text-white h-full flex flex-col border-r border-slate-700`}
      >
         {/* Header with toggle buttons */}
         <div className="flex items-center justify-between p-4 border-b border-slate-700 min-h-[73px]">
            <Menu
               className="cursor-pointer hover:text-gray-300 transition-colors"
               onClick={toggle}
               size={20}
            />
            {isOpen && (
               <ArrowLeftToLine
                  className="cursor-pointer hover:text-gray-300 transition-colors"
                  onClick={close}
                  size={20}
               />
            )}
         </div>
         {/* Recommended users section */}
         <div className="flex-1 overflow-y-auto pr-2">
            <Recommended isOpen={isOpen} users={recommended} />
            <Following isOpen={isOpen} users={following} />
         </div>
      </aside>
   );
};
