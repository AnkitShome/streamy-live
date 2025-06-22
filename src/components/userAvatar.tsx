import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"

// Define size variants
const AVATAR_SIZES = {
   sm: 24,
   md: 36,
   lg: 48,
   xl: 64,
}

export function UserAvatar({
   imageUrl,
   username,
   isLive = false,
   size = "md",
   showBadge = true,
}: {
   imageUrl: string
   username: string
   isLive?: boolean
   size?: keyof typeof AVATAR_SIZES
   showBadge?: boolean
}) {
   // Show initials if no image
   function getInitials(name: string) {
      return name
         .split(" ")
         .map((n) => n[0])
         .join("")
         .toUpperCase()
         .slice(0, 2)
   }

   const dimension = AVATAR_SIZES[size] || AVATAR_SIZES.md

   return (
      <div
         className={`relative flex-shrink-0 ${isLive ? "ring-2 ring-red-500 ring-offset-2 rounded-full" : ""}`}
         style={{ width: dimension, height: dimension }}
      >
         <Avatar className="w-full h-full">
            <AvatarImage src={imageUrl || "/placeholder.svg"} alt={username} />
            <AvatarFallback>{getInitials(username)}</AvatarFallback>
         </Avatar>
         {isLive && showBadge && (
            <div className="absolute -bottom-1 -right-1 flex items-center justify-center">
               <div className="relative">
                  {/* Pulsing background circle */}
                  <div className="absolute inset-0 bg-red-500 rounded-full animate-ping opacity-75" />
                  {/* Main live badge */}
                  <div className="relative bg-red-500 text-white text-[8px] font-bold px-1.5 py-0.5 rounded-full border-2 border-white shadow-sm">
                     LIVE
                  </div>
               </div>
            </div>
         )}
      </div>
   )
}