import { getUserByUsername } from "@/lib/user-actions";
import { isFollowingUser } from "@/lib/follow-actions";
import { FollowButton } from "./_components/FollowButton";

interface UserPageProps {
   params: { username: string }
}

export default async function UserPage({ params }: UserPageProps) {
   // In some Next.js setups, params can be a promise (rare!).
   // Let's resolve it if needed.
   const resolvedParams = (typeof params.then === "function")
      ? await params
      : params;

   const username = resolvedParams.username;
   const user = await getUserByUsername(username);

   if (!user) {
      return <div className="text-center text-red-500 mt-8">User not found</div>;
   }

   const userId = user.id;
   const isFollowing = await isFollowingUser({ id: userId });

   return (
      <div className="flex flex-col items-center gap-6 py-10">
         <div className="text-3xl font-bold">{user.username}</div>
         <div className="text-slate-300">{user.id}</div>
         <div className="mt-4">
            <FollowButton userId={userId} initialIsFollowing={isFollowing} />
         </div>
      </div>
   );
}
