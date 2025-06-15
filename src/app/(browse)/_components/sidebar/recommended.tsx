"use client"


const usersy = [
   { id: "1", username: "Jane Doe", avatar: "/avatars/jane.png" },
   { id: "2", username: "John Smith", avatar: "/avatars/john.png" },
   { id: "3", username: "Alice Lee", avatar: "/avatars/alice.png" },
]

// interface RecommendedProps {
//    isOpen: boolean
// }


export const Recommended = ({ isOpen, users = [] }) => {
   return (
      <div>
         {isOpen && <h2 className="text-base font-semibold text-slate-200 mb-2 pl-1">Recommended</h2>}
         <ul className="space-y-3">
            {users.map(user => (
               <li key={user.id} className="flex items-center">
                  <img src={user.imageUrl} alt={user.username} className="w-9 h-9 rounded-full border border-slate-600" />
                  {isOpen && (
                     <span className="ml-3 font-medium truncate">{user.username}</span>
                  )}
                  {user.stream?.isLive && (
                     <span className="ml-auto bg-red-500 text-white px-2 py-0.5 rounded text-xs font-bold">LIVE</span>
                  )}
               </li>
            ))}
         </ul>
      </div>
   )
}