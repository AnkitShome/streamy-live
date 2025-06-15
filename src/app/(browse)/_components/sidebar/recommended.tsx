"use client"


const recommended = [
   { id: "1", name: "Jane Doe", avatar: "/avatars/jane.png" },
   { id: "2", name: "John Smith", avatar: "/avatars/john.png" },
   { id: "3", name: "Alice Lee", avatar: "/avatars/alice.png" },
]

interface RecommendedProps {
   isOpen: boolean
}


export const Recommended = ({ isOpen }: RecommendedProps) => {
   return (
      <div className="mb-4">
         {
            isOpen &&
            (<h2 className="text-xl font-semibold mb-4">Recommended</h2>)
         }
         <ul className={isOpen ? "space-y-3" : "flex flex-col space-y-2"}>
            {
               recommended.map((user) => (
                  <li
                     key={user.id}
                     className={`flext items-center ${isOpen ? "" : "justify-center"}`}
                     title={user.name}
                  >
                     <img
                        src={user.avatar}
                        alt={user.name}
                        className="w-10 h-10 rounded-full border-2 border-slate-600" />
                     {
                        isOpen && (
                           <span className="ml-3 font-medium truncate">{user.name}</span>
                        )
                     }
                  </li>
               ))
            }

         </ul>
      </div>
   )
}