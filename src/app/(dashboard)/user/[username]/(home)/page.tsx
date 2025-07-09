import { StreamPlayer } from "@/components/stream-player/index"
import { getUserByUsername } from "@/lib/user-actions"
import { currentUser } from "@clerk/nextjs/server"

interface CreatorPageProps {
   params: {
      username: string
   }
}

const CreatorPage = async ({ params }: CreatorPageProps) => {

   const resolvedParams = await params

   const self = await currentUser()
   const user = await getUserByUsername(resolvedParams.username)

   if (!user || user.username !== self?.username || !user.stream) {
      throw new Error("Unauthorized")
   }

   // console.log(user.username)

   return (
      <div className="h-full">
         <StreamPlayer
            user={user}
            stream={user.stream}
            isFollowing={true}
         />
      </div>
   )
}

export default CreatorPage