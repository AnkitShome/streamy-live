// store/creatorSidebarStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";

export enum ChatVariant {
   CHAT = "CHAT",
   COMMUNITY = "COMMUNITY"
}

interface ChatSidebarStore {
   collapsed: boolean;
   variant: ChatVariant;
   onExpand: () => void;
   onCollapse: () => void;
   onChangeVariant: (variant: ChatVariant) => void;
}

export const useChatSidebar = create<ChatSidebarStore>(
   persist(
      (set) => ({
         collapsed: true,
         onExpand: () => set({ collapsed: false }),
         onCollapse: () => set({ collapsed: true }),
         onChangeVariant: (variant: ChatVariant) => set({ variant })
      }),
      {
         name: "chat-sidebar-storage", // The key in localStorage
      }
   )
);
