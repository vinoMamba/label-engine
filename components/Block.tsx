import { registerConfig } from "@/core/registerConfig"
import { useMarkLineStore } from "@/store/useMarkLineStore"
import { useScaleStore } from "@/store/useScaleStore"
import { useSchemaStore } from "@/store/useSchemaStore"
import { Block, DragState } from "@/types/type"
import { FC, useRef, MouseEventHandler, useEffect } from "react"

type Props = {
  block: Block
}

export const BlockItem: FC<Props> = (props) => {
  const currentBlockId = useRef<number | null>(null)
  const scale = useScaleStore((state) => state.scale)
  const [schema, updateBlock, clearAllFocus, deleteBlock, setCurrentBlock] = useSchemaStore((state) => [
    state.schema,
    state.updateBlock,
    state.clearAllFocus,
    state.deleteBlock,
    state.setCurrentBlock])
  const blockRef = useRef<HTMLDivElement>(null)
  const setMarkLine = useMarkLineStore((state) => state.setMarkLine)
  const drageState = useRef<DragState>()
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
      currentBlockId.current = props.block.id
      const newBlock = {
        ...props.block,
        focus: !props.block.focus,
        options: {
          ...props.block.options,
        }
      }
      clearAllFocus()
      updateBlock(newBlock)
      setCurrentBlock(newBlock)
    }
    handleMouseMove(e)
  }

  const handleMouseMove: MouseEventHandler<HTMLDivElement> = (e) => {
    const { clientX, clientY } = e
    const unFocusBlock = schema.blocks.filter((block) => block.id !== props.block.id)
    drageState.current = {
      startX: clientX,
      startY: clientY,
      startLeft: props.block.options.left,
      startTop: props.block.options.top,
      marklineCollection: (() => {
        const collection: DragState['marklineCollection'] = {
          x: [],
          y: []
        }
        unFocusBlock.forEach((block) => {
          const { top, left, width, height } = block.options
          collection.y.push({ showTop: top, top })
          collection.y.push({ showTop: top, top: top - props.block.options.height })
          collection.y.push({ showTop: top + height / 2, top: top + height / 2 - props.block.options.height / 2 })
          collection.y.push({ showTop: top + height, top: top + height })
          collection.y.push({ showTop: top + height, top: top + height - props.block.options.height })
          collection.x.push({ showLeft: left, left })
          collection.x.push({ showLeft: left + width, left: left + width })
          collection.x.push({ showLeft: left + width / 2, left: left + width / 2 - props.block.options.width / 2 })
          collection.x.push({ showLeft: left + width, left: left + width - props.block.options.width })
          collection.x.push({ showLeft: left, left: left - props.block.options.width })
        })
        return collection
      })()
    }

    function blockMouseMove(e: MouseEvent) {
      let { clientX: moveX, clientY: moveY } = e
      let left = Math.ceil((moveX - drageState.current!.startX) / scale + drageState.current!.startLeft)
      let top = Math.ceil((moveY - drageState.current!.startY) / scale + drageState.current!.startTop)
      let x = 0, y = 0
      drageState.current!.marklineCollection.x.forEach((markline) => {
        if (Math.abs(markline.left - left) < 5) {
          x = markline.showLeft
          left = markline.left
        }
      })
      drageState.current!.marklineCollection.y.forEach((markline) => {
        if (Math.abs(markline.top - top) < 5) {
          y = markline.showTop
          top = markline.top
        }
      })
      const newBlock = {
        ...props.block,
        focus: true,
        options: {
          ...props.block.options,
          left,
          top,
        }
      }
      setMarkLine({ x, y })
      updateBlock(newBlock)
    }


    //松开鼠标移除监听
    function blockMouseUp() {
      document.removeEventListener('mousemove', blockMouseMove);
      document.removeEventListener('mouseup', blockMouseUp);
      setMarkLine({ x: 0, y: 0 })
    }
    document.addEventListener('mousemove', blockMouseMove);
    document.addEventListener('mouseup', blockMouseUp);

  }

  /**
     * Delete 键，删除当前选中的元素
     * @param e
     */
  function blockDeleteKeyDown(e: KeyboardEvent) {
    if (e.key === 'Delete' && currentBlockId.current) {
      deleteBlock(currentBlockId.current)
      document.removeEventListener('keydown', blockDeleteKeyDown);
    }
  }
  useEffect(() => {
    document.addEventListener('keydown', blockDeleteKeyDown);
  }, [currentBlockId.current])


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
      {Material && <Material.renderInstance {...props.block.props} {...props.block.options} />}
    </div>
  )
}
