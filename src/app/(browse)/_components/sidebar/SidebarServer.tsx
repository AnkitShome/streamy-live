import { getRecommendedUsers, } from "@/lib/user-actions"
import { Sidebar } from ".";
import { getFollowedUsers } from "@/lib/follow-actions";

export const SidebarServer = async () => {

   const recommended = await getRecommendedUsers();
   const following = await getFollowedUsers()
   return (
      <Sidebar
         recommended={recommended}
         following={following}
      />
   )
}