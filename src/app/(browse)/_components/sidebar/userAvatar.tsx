import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

// Define size variants
const AVATAR_SIZES = {
   sm: 24,
   md: 36,
   lg: 48,
   xl: 64,
};

export function UserAvatar({
   imageUrl,
   username,
   isLive = false,
   size = "md",
   showBadge = true,
}: {
   imageUrl: string;
   username: string;
   isLive?: boolean;
   size?: keyof typeof AVATAR_SIZES;
   showBadge?: boolean;
}) {
   // Show initials if no image
   function getInitials(name: string) {
      return name
         .split(" ")
         .map((n) => n[0])
         .join("")
         .toUpperCase()
         .slice(0, 2);
   }

   const dimension = AVATAR_SIZES[size] || AVATAR_SIZES.md;

   return (
      <div
         className="relative flex-shrink-0"
         style={{ width: dimension, height: dimension }}
      >
         <Avatar className="w-full h-full">
            <AvatarImage src={imageUrl} alt={username} />
            <AvatarFallback>{getInitials(username)}</AvatarFallback>
         </Avatar>
         {isLive && showBadge && (
            <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-red-500 border-2 border-white animate-pulse" />
         )}
      </div>
   );
}
