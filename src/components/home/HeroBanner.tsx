import { Button } from "@/components/ui/button"
import { Play } from "lucide-react"

export default function HeroBanner() {
   return (
      <section className="relative rounded-3xl bg-gradient-to-br from-purple-600 via-pink-500 to-indigo-600 text-white p-12 overflow-hidden shadow-xl">
         <div className="relative z-10 max-w-3xl mx-auto text-center space-y-6">
            <h1 className="text-5xl font-extrabold tracking-tight">Unleash the Stream</h1>
            <p className="text-lg text-white/80">
               Dive into live streams that vibe as hard as you do. Gaming, coding, music, and more.
            </p>
            <Button className="bg-white text-purple-700 hover:bg-gray-100 font-bold px-6 py-3 rounded-full inline-flex items-center gap-2">
               <Play className="w-4 h-4" />
               Watch Now
            </Button>
         </div>
         <div className="absolute top-0 left-0 w-40 h-40 bg-white/10 rounded-full blur-3xl" />
         <div className="absolute bottom-0 right-0 w-72 h-72 bg-purple-800/20 rounded-full blur-3xl" />
      </section>
   )
}