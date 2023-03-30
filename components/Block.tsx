import { registerConfig } from "@/core/registerConfig"
import { Block } from "@/types/type"
import { FC, useRef, MouseEventHandler } from "react"

type Props = {
  block: Block
}
export const BlockItem: FC<Props> = (props) => {
  const blockRef = useRef<HTMLDivElement>(null)
  const Material = registerConfig.materialsMap.get(props.block.type)
  const handleMouseDown: MouseEventHandler<HTMLDivElement> = (e) => {
    e.stopPropagation()
    e.preventDefault()
     
  }
  return (
    <div
      onMouseDown={handleMouseDown}
      ref={blockRef}
      className="absolute"
      style={{
        border: props.block.focus ? '1px solid #1890ff' : 'none',
        top: props.block.options.top,
        left: props.block.options.left,
      }}
    >
      {Material && <Material.renderInstance />}
    </div>
  )
}
