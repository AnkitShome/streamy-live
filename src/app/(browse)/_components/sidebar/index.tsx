"use client";

import { useState, useEffect } from "react";
import { Menu, ArrowLeftToLine } from "lucide-react";

export const Sidebar = () => {
   const [open, setOpen] = useState(true);
   const [streams, setStreams] = useState([]);

   useEffect(() => {
      const fetchStreams = async () => {
         try {
            const response = await fetch("http://localhost:3000/api/streams");
            if (!response.ok) throw new Error("Failed to fetch streams");
            const data = await response.json();
            setStreams(data);
         } catch (error) {
            console.error("Error fetching streams:", error);
         }
      };

      fetchStreams();
   }, []);

   return (
      <div
         className={`${open ? "w-72" : "w-16"
            } transition-all duration-300 bg-slate-800 text-white h-screen p-4 flex flex-col relative`}
      >
         <div className="flex items-center justify-between">
            <Menu className="cursor-pointer" onClick={() => setOpen(!open)} />
            {open && (
               <ArrowLeftToLine
                  className="cursor-pointer"
                  onClick={() => setOpen(false)}
               />
            )}
         </div>

         {open && (
            <div className="mt-6 space-y-4 overflow-y-auto">
               <h2 className="text-xl font-semibold">Streams</h2>
               <ul className="space-y-2">
                  {streams.length === 0 ? (
                     <li className="text-gray-400">No streams found.</li>
                  ) : (
                     streams.map((stream) => (
                        <li key={stream.id}>
                           <p className="font-medium">{stream.title}</p>
                           <p className="text-sm text-gray-400">{stream.description}</p>
                        </li>
                     ))
                  )}
               </ul>
            </div>
         )}
      </div>
   );
};
