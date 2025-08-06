// components/socket/socket-wrapper.tsx
"use client";

import { SocketHandler } from "./socket-handler";

export const SocketWrapper = ({ userId }: { userId: string }) => {
   return <SocketHandler userId={userId} />;
};
