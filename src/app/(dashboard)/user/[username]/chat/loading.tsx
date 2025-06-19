import { Skeleton } from "@/components/ui/skeleton"
import { ToggleCardSkeleton } from "./_components/toggle-card"

const ChatLoading = () => {
   return (
      <div className="p-6 bg-slate-600 space-y-4 w-full">
         <Skeleton className="h-10 bg-slate-200/50 w-[200px]" />
         <div className="space-y-4">
            <ToggleCardSkeleton />
            <ToggleCardSkeleton />
            <ToggleCardSkeleton />
         </div>
      </div>
   )
}

export default ChatLoading