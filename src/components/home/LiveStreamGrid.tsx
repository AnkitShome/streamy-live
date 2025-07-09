import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Eye, Clock, Play, Star } from "lucide-react"

export function LiveStreamGrid({ streams }: { streams: any[] }) {
   return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
         {streams.map((stream) => (
            <Card
               key={stream.id}
               className="overflow-hidden border border-gray-200 shadow-md transition-transform hover:scale-[1.02] hover:shadow-purple-300/30"
            >
               <img
                  src={stream.thumbnail}
                  alt={stream.title}
                  className="w-full h-48 object-cover"
               />
               <CardContent className="p-4 space-y-4">
                  <div className="flex items-center gap-3">
                     <img
                        src={stream.avatar}
                        alt={stream.streamer}
                        className="w-10 h-10 rounded-full border"
                     />
                     <div className="flex-1">
                        <div className="flex items-center gap-1 text-sm font-semibold text-gray-800">
                           {stream.streamer}
                           {stream.isPartner && <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />}
                        </div>
                        <p className="text-xs text-gray-500">{stream.game}</p>
                     </div>
                  </div>
                  <p className="text-base text-gray-700 font-medium line-clamp-2">
                     {stream.title}
                  </p>
                  <div className="flex justify-between text-xs text-gray-500">
                     <span className="flex items-center gap-1">
                        <Eye className="w-4 h-4" /> {stream.viewers.toLocaleString()}
                     </span>
                     <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" /> {stream.duration}
                     </span>
                  </div>
                  <Button className="w-full text-sm gap-2 bg-purple-600 hover:bg-purple-700 text-white">
                     <Play className="w-4 h-4" />
                     Watch
                  </Button>
               </CardContent>
            </Card>
         ))}
      </div>
   )
}
