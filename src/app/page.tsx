"use client"
import { UserButton, useUser, SignedIn } from "@clerk/nextjs"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function Page() {
   const { isSignedIn } = useUser()
   const router = useRouter()

   useEffect(() => {
      if (!isSignedIn) {
         router.push("/sign-in")
      }
   }, [isSignedIn])

   if (!isSignedIn) return null

   return (
      <div>
         <h1>Dashboard</h1>
         <SignedIn>
            <UserButton afterSignOutUrl="/sign-in"></UserButton>
         </SignedIn>
         {/* Show secure content */}
      </div>
   )
}


// "use client"

// import { useState } from "react"
// import HeroBanner from "@/components/home/HeroBanner"
// import { CategoryTabs } from "@/components/home/CategoryTabs"
// import { LiveStreamGrid } from "@/components/home/LiveStreamGrid"
// import { Badge } from "@/components/ui/badge"

// const dummyStreams = [
//    {
//       id: 1,
//       streamer: "GamerPro_X",
//       title: "Valorant Ranked Grind - Road to Radiant!",
//       game: "Valorant",
//       viewers: 12500,
//       duration: "3h 24m",
//       thumbnail: "/placeholder.svg",
//       avatar: "/placeholder.svg",
//       isPartner: true,
//    },
//    {
//       id: 2,
//       streamer: "CodeMaster",
//       title: "Building a fullstack app with Next.js",
//       game: "Coding",
//       viewers: 3200,
//       duration: "1h 48m",
//       thumbnail: "/placeholder.svg",
//       avatar: "/placeholder.svg",
//       isPartner: false,
//    },
// ]

// export default function HomePage() {
//    const [activeCategory, setActiveCategory] = useState("Gaming")

//    return (
//       <main className="bg-white min-h-screen py-12 px-4 sm:px-6 lg:px-8">
//          <div className="max-w-7xl mx-auto space-y-16">
//             <HeroBanner />
//             <CategoryTabs active={activeCategory} setActive={setActiveCategory} />
//             <div className="flex items-center justify-between">
//                <h2 className="text-xl font-semibold text-purple-800">Live Now</h2>
//                <Badge className="bg-purple-100 text-purple-700 border border-purple-200">
//                   {dummyStreams.length} Live
//                </Badge>
//             </div>
//             <LiveStreamGrid streams={dummyStreams} />
//          </div>
//       </main>
//    )
// }
