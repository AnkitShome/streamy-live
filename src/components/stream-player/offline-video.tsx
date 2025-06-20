import { WifiOff } from "lucide-react";

interface OfflineVideoProps {
   username: string
}

export const OfflineVideo = ({ username }: OfflineVideoProps) => {
   return (
      <div className="h-full flex flex-col space-y-5 justify-center items-center">
         <WifiOff className="h-10 w-10 text-white" />
         <p className="text-white">
            {username} is offline
         </p>
      </div>
   )
}
