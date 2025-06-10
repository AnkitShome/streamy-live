import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Video, ExternalLink, Calendar, Eye, MoreHorizontal, Play, Users } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { DropdownMenuLabel } from "@radix-ui/react-dropdown-menu";

interface Stream {
   id: string
   title: string
   description?: string
   videoUrl?: string
   createdAt?: string
   views?: number
   status?: "live" | "scheduled" | "ended"
}

export function StreamList({ streams }: { streams: Stream[] }) {
   if (!streams || streams.length === 0) {
      return (
         <div className="">

         </div>
      )
   }

   const enhancedStreams = streams.map((stream) => ({
      ...stream,
      views: stream.views || Math.floor(Math.random() * 1000) + 100,
      status: stream.status || (Math.random() > 0.7 ? "live" : Math.random() > 0.5 ? "scheduled" : "ended"),
   }))


   return (
      <div>

         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {enhancedStreams.map((stream) => (
               <Card key={stream.id} className="overflow-hidden">
                  <div className="p-4">
                     <div className="flex items-start justify-center mb-3">
                        <div></div>
                        <h3>{stream.title}</h3>
                        <DropdownMenu>
                           <DropdownMenuTrigger asChild>
                              <Button variant='ghost' size='sm' className="h-8 w-8 p-0">
                                 <MoreHorizontal className="h-4 w-4" />
                              </Button>
                           </DropdownMenuTrigger>
                           <DropdownMenuContent align="end">
                              <DropdownMenuItem>Edit Stream</DropdownMenuItem>
                              <DropdownMenuItem className="text-destructive">Delete Stream</DropdownMenuItem>
                           </DropdownMenuContent>
                        </DropdownMenu>
                     </div>

                     <div className="flex items-center gap-2 mb-3">
                        <Badge
                           className={
                              stream.status === "live" ?
                                 "bg-red-500 text-white" :
                                 stream.status === 'scheduled' ?
                                    "bg-amber-500 text-white" :
                                    "bg-gray-500 text-white"
                           }
                        >
                           {stream.status === 'live' && <div className="w-1.5 h-1.5 bg-white rounded-full mr-1 animate-pulse" />}
                           {stream.status}
                        </Badge>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                           <Eye className="h-3 w-3" />
                           <span>{stream.views}</span>
                        </div>
                     </div>

                     {stream.description && (
                        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{stream.description}</p>
                     )}


                     <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
                        <div className="flex items-center gap-1">
                           <Users className="h-3 w-3" />
                           <span>{Math.floor(Math.random() * 50)}</span>
                        </div>
                        <div className="flex items-center gap-1">
                           <Calendar className="h-3 w-3" />
                           <span>2 days ago</span>
                        </div>
                     </div>

                     <div className="flex gap-2">
                        {stream.videoUrl ? (
                           <Button asChild size="sm" className="flex-1">
                              <a
                                 href={stream.videoUrl}
                                 target="_blank"
                                 rel="noopener noreferrer"
                                 className="flex items-center justify-center gap-2"
                              >
                                 <Play className="h-3 w-3" />
                                 Watch
                              </a>
                           </Button>
                        ) : (
                           <Button size="sm" className="flex-1" disabled>
                              <Play className="h-3 w-3 mr-2" />
                              No URL
                           </Button>
                        )}

                        <Button variant="outline" size="sm">
                           <ExternalLink className="h-3 w-3" />
                        </Button>
                     </div>
                  </div>
               </Card>
            ))
            }
         </div >
      </div>

   )
}

