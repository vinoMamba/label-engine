import { labelSchema } from "@/core/schema"
import { Block, Schema } from "@/types/type"
import { create } from "zustand"

type State = {
  schema: Schema
}
type Actions = {
  updateSchema: (schema: Schema) => void
  updateBlock: (block: Block) => void
  pushBlock: (block: Block) => void
  clearAllFocus: () => void
}
export const useSchemaStore = create<State & Actions>((set) => ({
  schema: labelSchema,

  updateSchema: (schema: Schema) => set({ schema }),

  pushBlock: (block) => (set((state) => ({
    schema: {
      ...state.schema,
      blocks: [...state.schema.blocks, block]
    }
  }))),

  updateBlock: (block) => (set((state) => {
    const blocks = [...state.schema.blocks]
    const index = blocks.findIndex((b) => b.id === block.id)
    if (index !== -1) {
      blocks[index] = block
    }
    return {
      schema: {
        ...state.schema,
        blocks
      }
    }
  })),

  clearAllFocus: () => (set((state) => {
    const blocks = [...state.schema.blocks]
    blocks.forEach((b) => {
      b.focus = false
    })
    return {
      schema: {
        ...state.schema,
        blocks
      }
    }
  })),
}))
