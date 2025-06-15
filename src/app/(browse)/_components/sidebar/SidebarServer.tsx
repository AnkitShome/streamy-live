import { getRecommendedUsers, getFollowingUsers } from "@/actions/authActions";
import { Sidebar } from ".";

export const SidebarServer = async ({ currentUserId }: { currentUserId: string }){
   const recommended = await getRecommendedUsers(currentUserId);
   const following = await getFollowingUsers(currentUserId)
   return (
      <Sidebar
         recommended={recommended}
         following={following}
      />
   )
}