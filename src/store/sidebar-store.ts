// store/sidebar-store.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface SidebarState {
   isOpen: boolean;
   toggle: () => void;
   open: () => void;
   close: () => void;
}

// Now uses localStorage under the hood
export const useSidebarStore = create<SidebarState>()(
   persist(
      (set) => ({
         isOpen: true,
         toggle: () => set((state) => ({ isOpen: !state.isOpen })),
         open: () => set({ isOpen: true }),
         close: () => set({ isOpen: false }),
      }),
      {
         name: "sidebar-storage", // The key in localStorage
      }
   )
);
