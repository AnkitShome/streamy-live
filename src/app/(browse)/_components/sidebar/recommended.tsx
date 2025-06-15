"use client";

import Link from "next/link";
import { UserAvatar } from "./UserAvatar";

export const Recommended = ({ isOpen, users = [] }) => {
   if (!users.length) return null;

   return (
      <div>
         {isOpen && (
            <h2 className="text-base font-semibold text-slate-400 mb-2 pl-1">Recommended</h2>
         )}
         <ul className="space-y-3">
            {users.map((user) => (
               <li key={user.id}>
                  <Link
                     href={`/${user.username}`} // Or `/user/${user.id}` if you use ids
                     className="
                flex items-center group rounded-lg px-2 py-1 transition
                hover:shadow-lg hover:bg-slate-700/60
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500
              "
                     style={{ textDecoration: 'none' }}
                  >
                     <UserAvatar
                        imageUrl={user.imageUrl}
                        username={user.username}
                        isLive={user.stream?.isLive}
                        size={36}
                     />
                     {isOpen && (
                        <span className="ml-3 font-medium truncate group-hover:underline">
                           {user.username}
                        </span>
                     )}
                     {user.stream?.isLive && isOpen && (
                        <span className="ml-auto bg-red-500 text-white px-2 py-0.5 rounded text-xs font-bold">
                           LIVE
                        </span>
                     )}
                  </Link>
               </li>
            ))}
         </ul>
      </div>
   );
};
