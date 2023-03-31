import { registerConfig } from "@/core/registerConfig"
import { useMarkLineStore } from "@/store/useMarkLineStore"
import { useScaleStore } from "@/store/useScaleStore"
import { useSchemaStore } from "@/store/useSchemaStore"
import { Block } from "@/types/type"
import { FC, useRef, MouseEventHandler, useEffect } from "react"

type Props = {
  block: Block
}

export const BlockItem: FC<Props> = (props) => {
  const scale = useScaleStore((state) => state.scale)
  const [schema, updateBlock, clearAllFocus] = useSchemaStore((state) => [state.schema, state.updateBlock, state.clearAllFocus])
  const blockRef = useRef<HTMLDivElement>(null)
  const markLineState = useRef<{ x: Array<{ showTop: number, top: number }>, y: Array<{ showLeft: number, left: number }> }>({
    x: [],
    y: []
  })
  const setMarkLine = useMarkLineStore((state) => state.setMarkLine)
  const Material = registerConfig.materialsMap.get(props.block.type)

  //初始化block的宽高
  useEffect(() => {
    const { width, height } = blockRef.current!.getBoundingClientRect()
    updateBlock({
      ...props.block,
      options: {
        ...props.block.options,
        width: Math.ceil(width / scale),
        height: Math.ceil(height / scale),
      }
    })
  }, [])

  const handleMouseDown: MouseEventHandler<HTMLDivElement> = (e) => {
    e.stopPropagation()
    e.preventDefault()
    if (!props.block.focus) {
      const newBlock = {
        ...props.block,
        focus: !props.block.focus,
        options: {
          ...props.block.options,
        }
      }
      clearAllFocus()
      updateBlock(newBlock)
    }

    markLineState.current.x = []
    markLineState.current.y = []
    const unFocusBlock = schema.blocks.filter((block) => block.id !== props.block.id)
    unFocusBlock.forEach((block) => {
      const { width, height, left, top } = block.options
      // AB 顶对顶
      markLineState.current.x.push({
        showTop: props.block.options.top,
        top: props.block.options.top
      })
    })

    handleMouseMove(e)
  }

  const handleMouseMove: MouseEventHandler<HTMLDivElement> = (e) => {
    const { clientX, clientY } = e
    function blockMouseMove(e: MouseEvent) {
      const { clientX: moveX, clientY: moveY } = e
      const newBlock = {
        ...props.block,
        focus: true,
        options: {
          ...props.block.options,
          top: Math.ceil(props.block.options.top + (moveY - clientY) / scale),
          left: Math.ceil(props.block.options.left + (moveX - clientX) / scale),
        }
      }
      updateBlock(newBlock)
      markLineState.current.x.forEach((x) => {
        const { showTop, top } = x
        if (Math.abs(top - newBlock.options.top) < 10) {
          setMarkLine({ x: 0, y: showTop })
        }
      })
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
      className="absolute p-16 bg-red"
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
