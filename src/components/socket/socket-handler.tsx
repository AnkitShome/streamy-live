"use client";

import { useEffect } from "react";
import { useSocketNotifications } from "@/hooks/useSocketNotifications";

interface Props {
   userId: string;
}

export const SocketHandler = ({ userId }: Props) => {
   useSocketNotifications(userId);
   return null;
};
