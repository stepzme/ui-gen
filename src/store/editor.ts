import { create } from "zustand";

type Mode = "pages" | "flow";
type Device = "mobile" | "desktop";

interface LockState {
  lockedElementIds: Set<string>;
}

interface EditorState {
  mode: Mode;
  device: Device;
  selectedPageId: string | null;
  locks: LockState;
  currentLockId: string | null;
  setMode: (mode: Mode) => void;
  setDevice: (device: Device) => void;
  selectPage: (pageId: string | null) => void;
  lockElement: (id: string) => void;
  unlockElement: (id: string) => void;
  resetLocks: () => void;
  setCurrentLock: (lockId: string | null) => void;
}

export const useEditorStore = create<EditorState>((set) => ({
  mode: "pages",
  device: "desktop",
  selectedPageId: null,
  locks: { lockedElementIds: new Set() },
  currentLockId: null,
  setMode: (mode) => set({ mode }),
  setDevice: (device) => set({ device }),
  selectPage: (selectedPageId) => set({ selectedPageId }),
  lockElement: (id) =>
    set((s) => {
      const next = new Set(s.locks.lockedElementIds);
      next.add(id);
      return { locks: { lockedElementIds: next } };
    }),
  unlockElement: (id) =>
    set((s) => {
      const next = new Set(s.locks.lockedElementIds);
      next.delete(id);
      return { locks: { lockedElementIds: next } };
    }),
  resetLocks: () => set({ locks: { lockedElementIds: new Set() } }),
  setCurrentLock: (currentLockId) => set({ currentLockId }),
}));


