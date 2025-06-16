import { getRecommendedUsers, } from "@/lib/user-actions"
import { Sidebar } from ".";

export const SidebarServer = async () => {

   const recommended = await getRecommendedUsers();

   // const following = await getFollowingUsers(currentUserId)
   return (
      <Sidebar
         recommended={recommended}
      // following={following}
      />
   )
}