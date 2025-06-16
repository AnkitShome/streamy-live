"use client";
import { useState } from "react";

export function FollowButton({
   userId,
   initialIsFollowing,
}: {
   userId: string;
   initialIsFollowing: boolean;
}) {
   const [isFollowing, setIsFollowing] = useState(initialIsFollowing);
   const [loading, setLoading] = useState(false);

   async function handleFollow() {
      setLoading(true);
      const res = await fetch(`/api/follow/${userId}`, { method: "POST" });
      if (res.ok) setIsFollowing(true);
      setLoading(false);
   }

   async function handleUnfollow() {
      setLoading(true);
      const res = await fetch(`/api/follow/${userId}`, { method: "DELETE" });
      if (res.ok) setIsFollowing(false);
      setLoading(false);
   }

   return (
      <button
         onClick={isFollowing ? handleUnfollow : handleFollow}
         disabled={loading}
         className={`px-4 py-2 rounded transition ${isFollowing ? "bg-slate-700" : "bg-blue-600 hover:bg-blue-700"} text-white`}
      >
         {loading ? "..." : isFollowing ? "Unfollow" : "Follow"}
      </button>
   );
}
