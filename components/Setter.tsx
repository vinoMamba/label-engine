import { useSchemaStore } from "@/store/useSchemaStore"


export const Setter = () => {
  const [currentBlock, deleteBlock] = useSchemaStore((state) => [state.currentBlock, state.deleteBlock])
  const handleDelete = () => {
    if (currentBlock) {
      deleteBlock(currentBlock.id)
    }
  }
  return (
    <div className="p-8 pt-0 flex flex-col h-full">
      <div className="flex-grow">
        {currentBlock?.type}
      </div>
      {currentBlock && (
        <button className="w-full p-8 bg-red" onClick={handleDelete} >
          删除控件
        </button>
      )}
    </div>
  )
}
