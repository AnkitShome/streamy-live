"use client"
import { useTransition } from "react"
import { useState } from "react";
import { handleFollow, handleUnfollow } from "@/actions/follow"

interface FollowButtonProps {
   userId: string;
   initialIsFollowing: boolean;
}

export function FollowButton({ userId, initialIsFollowing }: FollowButtonProps) {
   const [isFollowing, setIsFollowing] = useState(initialIsFollowing);
   const [isPending, startTransition] = useTransition();

   const onClick = () => {
      startTransition(() => {
         const action = isFollowing ? handleUnfollow : handleFollow;
         action(userId)
            .then(() => setIsFollowing((prev) => !prev))
            .catch((error) => console.log(error))
      })
   }

   return (
      <button
         onClick={onClick}
         disabled={isPending}
         className={`px-4 py-2 rounded transition ${isPending ? "bg-transparent" : ""} ${isFollowing ? "bg-slate-700" : "bg-blue-600 hover:bg-blue-700"} text-white`}
      >
         {isFollowing ? "Unfollow" : "Follow"}
      </button>
   )
}

// "use client";
// import { useState } from "react";
// import { useRouter } from "next/navigation";

// export function FollowButton({
//    userId,
//    initialIsFollowing,
// }: {
//    userId: string;
//    initialIsFollowing: boolean;
// }) {
//    const router = useRouter();
//    const [isFollowing, setIsFollowing] = useState(initialIsFollowing);
//    const [loading, setLoading] = useState(false);

//    async function handleFollow() {
//       setLoading(true);
//       const res = await fetch(`/api/follow/${userId}`, { method: "POST" });
//       if (res.ok) {
//          setIsFollowing(true);
//          router.refresh();
//       }
//       setLoading(false);
//    }

//    async function handleUnfollow() {
//       setLoading(true);
//       const res = await fetch(`/api/follow/${userId}`, { method: "DELETE" });
//       if (res.ok) {
//          setIsFollowing(false);
//          router.refresh();
//       }
//       setLoading(false);
//    }

//    return (
//       <button
//          onClick={isFollowing ? handleUnfollow : handleFollow}
//          disabled={loading}
//          className={`px-4 py-2 rounded transition ${isFollowing ? "bg-slate-700" : "bg-blue-600 hover:bg-blue-700"} text-white`}
//       >
//          {loading ? "..." : isFollowing ? "Unfollow" : "Follow"}
//       </button>
//    );
// }
