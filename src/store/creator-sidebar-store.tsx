// store/creatorSidebarStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface CreatorSidebarState {
   isOpen: boolean;
   open: () => void;
   close: () => void;
   toggle: () => void;
}

export const useCreatorSidebar = create<CreatorSidebarState>(
   persist(
      (set) => ({
         isOpen: true,
         toggle: () => set((state) => ({ isOpen: !state.isOpen })),
         open: () => set({ isOpen: true }),
         close: () => set({ isOpen: false }),
      }),
      {
         name: "creator-sidebar-storage", // The key in localStorage
      }
   )
);
