// "use client";
// import { UserButton, useUser, SignedIn } from "@clerk/nextjs";
// import { usePathname, useRouter } from "next/navigation";
// import { useEffect } from "react";

// export default function HomePage() {
//    const { isSignedIn, isLoaded } = useUser();
//    const router = useRouter();
//    const pathname = usePathname()

//    useEffect(() => {
//       if (isLoaded && !isSignedIn && pathname !== "/sign-in") {
//          router.push("/sign-in");
//       }
//    }, [isLoaded, isSignedIn]);

//    if (!isLoaded) return null;      // <-- Wait for Clerk to load
//    if (!isSignedIn) return null;    // <-- You could show a spinner here instead

//    return (
//       <div>
//          <SignedIn>
//             <UserButton afterSignOutUrl="/sign-in" />
//          </SignedIn>
//          {/* ...rest of your UI */}
//       </div>
//    );
// }


"use client";
import { UserButton, useUser, SignedIn } from "@clerk/nextjs";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function HomePage() {
   const { isSignedIn, isLoaded } = useUser();
   const router = useRouter();
   const pathname = usePathname();

   useEffect(() => {
      if (isLoaded && !isSignedIn && pathname !== "/sign-in") {
         router.push("/sign-in");
      }
   }, [isLoaded, isSignedIn, pathname]);

   if (!isLoaded || !isSignedIn) return null;

   return (
      <div>
         <SignedIn>
            <UserButton afterSignOutUrl="/sign-in" />
         </SignedIn>
         {/* ...rest of your UI */}
      </div>
   );
}
