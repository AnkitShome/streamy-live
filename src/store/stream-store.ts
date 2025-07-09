import { create } from "zustand"

type StreamStore = {
   liveUserIds: string[];
   addLiveUser: (id: string) => void;
   removeLiveUser: (id: string) => void;
}

export const useStreamStore = create<StreamStore>((set) => ({
   liveUserIds: [],
   addLiveUser: (id) =>
      set((state) => ({
         liveUserIds: state.liveUserIds.includes(id) ?
            state.liveUserIds :
            [...state.liveUserIds, id],
      })),
   removeLiveUser: (id) =>
      set((state) => ({
         liveUserIds: state.liveUserIds.filter((userId) => userId !== id)
      })),

}))
