import { getSelf, getRecommendedUsers, getFollowingUsers } from "@/actions/authActions";
import { Sidebar } from ".";

export const SidebarServer = async () => {
   const currentUser = await getSelf()
   const currentUserId = currentUser.id;

   const recommended = await getRecommendedUsers(currentUserId);
   const following = await getFollowingUsers(currentUserId)
   return (
      <Sidebar
         recommended={recommended}
         following={following}
      />
   )
}