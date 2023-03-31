import { MarkLine } from "@/types/type"
import { create } from "zustand"

type State = {
  markLine: MarkLine
}
type Actions = {
  setMarkLine: (markLine: MarkLine) => void
}
/**
 * 辅助线状态管理
 */

export const useMarkLineStore = create<State & Actions>((set) => ({
  markLine: {
    x: 0,
    y: 0,
  },
  setMarkLine: (markLine) => set({ markLine }),
}))
