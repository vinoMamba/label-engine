import { create } from "zustand"

type State = {
  fieldList: Array<{ label: string, value: string }>
}
type Actions = {
  setFieldList: (fieldList: Record<string, any>[]) => void
}
/**
 * 辅助线状态管理
 */

export const useFieldListStore = create<State & Actions>((set) => ({
  fieldList: [],
  setFieldList: (fieldList) => set((state) => {
    state.fieldList = fieldList.map(item => {
      return {
        label: item.name,
        value: item.fieldName
      }
    })
    return state
  }),
}))
