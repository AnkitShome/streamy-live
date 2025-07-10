import { notFound, redirect } from "next/navigation";
import { getSelf, getUserByUsername } from "@/lib/user-actions";
import { isFollowingUser } from "@/lib/follow-actions";
import { StreamPlayer } from "@/components/stream-player";

interface UserPageProps {
   params: {
      username: string;
   };
}

const UserPage = async ({ params }: UserPageProps) => {
   const resolvedParams = await params
   const user = await getUserByUsername(resolvedParams.username)

   if (!user || !user.stream) {
      notFound()
   }

   const isFollowing = await isFollowingUser({ id: user.id });

   const viewer = await getSelf();
   if (!viewer) redirect("/sign-in")

   return (
      <StreamPlayer
         user={user}
         stream={user.stream}
         isFollowing={isFollowing}
         viewerId={viewer.id}
         viewerName={viewer.username}
      />
   )
}


export default UserPage;