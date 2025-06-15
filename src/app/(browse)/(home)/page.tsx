"use client";
import { UserButton, useUser, SignedIn } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function HomePage() {
   const { isSignedIn } = useUser();
   const router = useRouter();

   useEffect(() => {
      if (!isSignedIn) {
         router.push("/sign-in");
      }
   }, [isSignedIn]);

   if (!isSignedIn) return null;

   return (
      <div>
         {/* Your homepage content here */}
         <SignedIn>
            <UserButton afterSignOutUrl="/sign-in" />
         </SignedIn>
         {/* ...rest of your UI */}
      </div>
   );
}
