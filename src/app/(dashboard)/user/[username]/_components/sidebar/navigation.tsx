"use client"

import { useUser } from "@clerk/nextjs"
import { usePathname } from "next/navigation"
import { Fullscreen, KeyRound, MessageSquare, Users } from "lucide-react"

import { NavItem } from "./nav-item"

export const Navigation = ({ isOpen }) => {
   const pathname = usePathname();
   const { user } = useUser();

   const routes = [
      {
         label: "Stream",
         href: `/user/${user?.username}`,
         icon: Fullscreen
      },
      {
         label: "Keys",
         href: `/user/${user?.username}/keys`,
         icon: KeyRound
      },
      {
         label: "Chat",
         href: `/user/${user?.username}/chat`,
         icon: MessageSquare
      },
   ]

   // if (!user?.username) {
   //    return (
   //       <ul className="space-y-2">
   //          {[...Array(3)].map((_, i) => (
   //             <NavItemSkeleton key={i} />
   //          ))}
   //       </ul>
   //    )
   // }

   return (
      <ul className="space-y-4 px-2 pt-4 lg:pt-0">
         {routes.map((route) => (
            <NavItem
               key={route.href}
               label={route.label}
               icon={route.icon}
               href={route.href}
               isActive={pathname === route.href}
               isOpen={isOpen} />
         ))}
      </ul>
   )
}

