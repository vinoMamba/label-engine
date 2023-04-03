import { useSchemaStore } from "@/store/useSchemaStore"
import { Block } from "@/types/type"
import { FieldSetter } from "./setter/FieldSetter"
import { QrCodeSetter } from "./setter/QrCodeSetter"
import { LogoSetter } from "./setter/LogoSetter"
import { CustomTextSetter } from "./setter/CustomTextSetter"


export const Setter = () => {
  const [currentBlock, deleteBlock] = useSchemaStore((state) => [state.currentBlock, state.deleteBlock])
  const handleDelete = () => {
    if (currentBlock) {
      deleteBlock(currentBlock.id)
    }
  }
  function generateSetter(type: Block['type']) {
    switch (type) {
      case 'qrCode':
        return <QrCodeSetter />
      case 'field':
        return <FieldSetter />
      case 'logo':
        return <LogoSetter block={currentBlock!} />
      case 'customText':
        return <CustomTextSetter block={currentBlock!} />
      default:
        return <div>请选择控件</div>
    }
  }
  return (
    <div className="p-8 pt-0 flex flex-col h-full">
      <div className="flex-grow">
        {currentBlock?.type ?
          generateSetter(currentBlock.type) :
          <div>请选择控件</div>
        }
      </div>
      {currentBlock && (
        <button className="w-full p-8 bg-red" onClick={handleDelete} >
          删除控件
        </button>
      )}
    </div>
  )
}
