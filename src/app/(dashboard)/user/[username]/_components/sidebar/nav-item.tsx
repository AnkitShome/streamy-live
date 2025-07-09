"use client";

import Link from "next/link";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

interface NavItemProps {
   icon: LucideIcon;
   label: string;
   href: string;
   isActive: boolean;
   isOpen: boolean;
}

export const NavItem = ({
   icon: Icon,
   label,
   href,
   isActive,
   isOpen,
}: NavItemProps) => {
   return (
      <Button
         asChild
         variant="ghost"
         className={cn(
            "w-full h-12 hover:bg-slate-700",
            isOpen ? "justify-start" : "justify-center",
            isActive && "bg-slate-700 text-slate-100"
         )}
      >
         <Link href={href}>
            <div className="flex items-center gap-x-4">
               <Icon className={cn("h-5 w-5", isOpen ? "mr-2" : "mr-0")} />
               {isOpen && <span>{label}</span>}
            </div>
         </Link>
      </Button>
   );
};

export const NavItemSkeleton = () => {
   return (
      <li className="flex items-center gap-x-4 px-3 py-2">
         <Skeleton className="min-h-[48px] min-w-[48px] rounded-md" />
         <div className="flex-1 hidden lg:block">
            <Skeleton className="h-6" />
         </div>
      </li>
   );
};
