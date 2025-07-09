import { useStreamStore } from "@/store/stream-store";
import Link from "next/link";
import { UserAvatar } from "@/components/userAvatar";

export const Following = ({ isOpen, users = [] }) => {

   if (!users.length) return null;

   const liveUserIds = useStreamStore((state) => state.liveUserIds);

   return (
      <div>
         {isOpen && (
            <h2 className="text-base font-semibold text-slate-400 mb-2 pl-1">Following</h2>
         )}

         <ul className="space-y-3">
            {users.map((user) => {
               const isLive = user.stream?.isLive
               // || liveUserIds.includes(user.id);

               return (
                  <li key={user.id}>
                     <Link href={`/${user.username}`} className="flex items-center group rounded-lg pl-2 py-1 transition hover:shadow-lg hover:bg-slate-700/60">
                        <UserAvatar
                           imageUrl={user.imageUrl}
                           username={user.username}
                           isLive={isLive}
                           size={36}
                        />
                        {isOpen && (
                           <span className="ml-3 font-medium truncate group-hover:underline">
                              {user.username}
                           </span>
                        )}
                        {isLive && isOpen && (
                           <span className="ml-auto bg-red-500 text-white px-2 py-0.5 rounded text-xs font-bold">
                              LIVE
                           </span>
                        )}
                     </Link>
                  </li>
               );
            })}
         </ul>
      </div>
   );
};