import type React from "react"
import { Navbar } from "./_components/navbar"
import { Sidebar } from "./_components/sidebar"

const BrowseLayout = ({ children }: { children: React.ReactNode }) => {
   return (
      <div className="flex flex-col h-screen">
         {/* Navbar at top */}
         <Navbar />

         {/* Sidebar and page content side-by-side */}
         <div className="flex flex-1 min-h-0">
            {/* Sidebar with dynamic width - no fixed width here */}
            <Sidebar />

            {/* Main content with independent scrolling */}
            <main className="flex-1 overflow-y-auto p-6 bg-white">{children}</main>
         </div>
      </div>
   )
}

export default BrowseLayout
