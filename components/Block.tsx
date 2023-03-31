import { registerConfig } from "@/core/registerConfig"
import { useSchemaStore } from "@/store/useSchemaStore"
import { Block } from "@/types/type"
import { FC, useRef, MouseEventHandler } from "react"

type Props = {
  block: Block
}
export const BlockItem: FC<Props> = (props) => {
  const [updateBlock, clearAllFocus] = useSchemaStore((state) => [state.updateBlock, state.clearAllFocus])
  const blockRef = useRef<HTMLDivElement>(null)
  const Material = registerConfig.materialsMap.get(props.block.type)
  const handleMouseDown: MouseEventHandler<HTMLDivElement> = (e) => {
    e.stopPropagation()
    e.preventDefault()
    const newBlock = {
      ...props.block,
      focus: !props.block.focus
    }
    clearAllFocus()
    updateBlock(newBlock)
    handleMouseMove(e)
  }

  const handleMouseMove: MouseEventHandler<HTMLDivElement> = (e) => {
    console.log(props.block.focus)
    const { clientX, clientY } = e
    function blockMouseMove(e: MouseEvent) {
      const { clientX: moveX, clientY: moveY } = e
      const newBlock = {
        ...props.block,
        focus: true,
        options: {
          ...props.block.options,
          top: props.block.options.top + moveY - clientY,
          left: props.block.options.left + moveX - clientX
        }
      }
      updateBlock(newBlock)
    }


    //松开鼠标移除监听
    function blockMouseUp() {
      document.removeEventListener('mousemove', blockMouseMove);
      document.removeEventListener('mouseup', blockMouseUp);
    }
    document.addEventListener('mousemove', blockMouseMove);
    document.addEventListener('mouseup', blockMouseUp);

  }

  return (
    <div
      onMouseDown={handleMouseDown}
      ref={blockRef}
      className="absolute"
      style={{
        border: props.block.focus ? '1px solid #1890ff' : '1px solid #f0f0f0',
        top: props.block.options.top,
        left: props.block.options.left,
      }}
    >
      {Material && <Material.renderInstance />}
    </div>
  )
}
