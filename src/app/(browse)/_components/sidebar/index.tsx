"use client"

import { useState, useEffect } from "react"
import { Menu, ArrowLeftToLine, Circle } from "lucide-react"
import { useSidebarStore } from "@/store/sidebar-store"

interface Stream {
   id: string
   title: string
   description: string
}

export const Sidebar = () => {
   const { isOpen, toggle, close } = useSidebarStore()
   const [streams, setStreams] = useState<Stream[]>([])

   useEffect(() => {
      const fetchStreams = async () => {
         try {
            const response = await fetch("http://localhost:3000/api/streams")
            if (!response.ok) throw new Error("Failed to fetch streams")
            const data = await response.json()
            setStreams(data)
         } catch (error) {
            console.error("Error fetching streams:", error)
            // Add some mock data for demonstration
            setStreams(
               Array.from({ length: 30 }, (_, i) => ({
                  id: `stream-${i}`,
                  title: `Stream ${i + 1}`,
                  description: `Description for stream ${i + 1}. This is a longer description to test text wrapping and truncation.`,
               })),
            )
         }
      }

      fetchStreams()
   }, [])

   return (
      <div
         className={`${isOpen ? "w-72" : "w-16"
            } transition-all duration-300 ease-in-out bg-slate-800 text-white h-full flex flex-col border-r border-slate-700`}
      >
         {/* Header with toggle buttons */}
         <div className="flex items-center justify-between p-4 border-b border-slate-700 min-h-[73px]">
            <Menu className="cursor-pointer hover:text-gray-300 transition-colors" onClick={toggle} size={20} />
            {isOpen && (
               <ArrowLeftToLine className="cursor-pointer hover:text-gray-300 transition-colors" onClick={close} size={20} />
            )}
         </div>

         {/* Content area */}
         <div className="flex-1 overflow-hidden">
            {isOpen ? (
               /* Expanded state with scrollable content */
               <div className="h-full overflow-y-auto p-4">
                  <div className="space-y-4">
                     <h2 className="text-xl font-semibold sticky top-0 bg-slate-800 py-2 -mx-4 px-4 border-b border-slate-700 mb-4">
                        Streams
                     </h2>
                     <ul className="space-y-3">
                        {streams.length === 0 ? (
                           <li className="text-gray-400 text-sm">No streams found.</li>
                        ) : (
                           streams.map((stream) => (
                              <li
                                 key={stream.id}
                                 className="p-3 rounded-lg bg-slate-700 hover:bg-slate-600 cursor-pointer transition-colors group"
                              >
                                 <p className="font-medium truncate group-hover:text-white">{stream.title}</p>
                                 <p className="text-sm text-gray-400 line-clamp-2 mt-1">{stream.description}</p>
                              </li>
                           ))
                        )}
                     </ul>
                  </div>
               </div>
            ) : (
               /* Collapsed state with icon indicators */
               <div className="h-full overflow-y-auto p-2">
                  <div className="space-y-2">
                     {streams.slice(0, 15).map((stream, index) => (
                        <div
                           key={stream.id}
                           className="w-10 h-10 bg-slate-700 hover:bg-slate-600 rounded-lg flex items-center justify-center text-xs font-semibold cursor-pointer transition-colors group relative"
                           title={stream.title}
                        >
                           <Circle size={8} className="fill-current" />

                           {/* Tooltip on hover */}
                           <div className="absolute left-full ml-2 px-2 py-1 bg-slate-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10">
                              {stream.title}
                           </div>
                        </div>
                     ))}

                     {streams.length > 15 && (
                        <div className="w-10 h-10 bg-slate-600 rounded-lg flex items-center justify-center text-xs font-semibold text-gray-300">
                           +{streams.length - 15}
                        </div>
                     )}
                  </div>
               </div>
            )}
         </div>
      </div>
   )
}
