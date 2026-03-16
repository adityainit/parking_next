// store/sessionStore.ts
import { create } from "zustand"

type SessionStore = {
  refreshTrigger: number
  triggerRefresh: () => void
}

export const useSessionStore = create<SessionStore>((set) => ({
  refreshTrigger: 0,
  triggerRefresh: () => set((state) => ({ refreshTrigger: state.refreshTrigger + 1 }))
}))