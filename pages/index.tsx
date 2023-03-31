import Head from 'next/head'
import { registerConfig } from '@/core/registerConfig'
import { DragEventHandler, useRef } from 'react'
import { Block, Material } from '@/types/type'
import { BlockItem } from '@/components/Block'
import { useSchemaStore } from '@/store/useSchemaStore'
import { StepCounter } from '@/components/StepCounter'
import { useScaleStore } from '@/store/useScaleStore'
import { useMarkLineStore } from '@/store/useMarkLineStore'

export default function Home() {
  const scale = useScaleStore((state) => state.scale)
  const [schema, pushBlock] = useSchemaStore((state) => [state.schema, state.pushBlock])
  const [markLine] = useMarkLineStore((state) => [state.markLine])
  const currentMaterial = useRef<Material>()

  const handleDragStart = (material: Material) => {
    currentMaterial.current = material
  }
  const handleDragEnter: DragEventHandler<HTMLDivElement> = (e) => {
    e.dataTransfer.dropEffect = 'move'
  }

  const handleDragLeave: DragEventHandler<HTMLDivElement> = (e) => {
    e.dataTransfer.dropEffect = 'none'
  }

  const handleDrop: DragEventHandler<HTMLDivElement> = (e) => {
    const { offsetX, offsetY } = e.nativeEvent
    const block: Block = {
      id: Date.now(),
      type: currentMaterial.current!.type,
      focus: false,
      options: {
        top: offsetY,
        left: offsetX,
        width: 0,
        height: 0,
      }
    }
    pushBlock(block)
  }
  return (
    <>
      <Head>
        <title>Label Engine</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className='h-screen'>
        <header className='h-72 border border-solid border-b-blue flex justify-center items-center'>自定义标签画板</header>
        <div className='flex  h[calc(100vh-72px)]'>
          <section className='p-16 pt-0 w-200'>
            <p className='text-18 font-700'>控件库</p>
            <ul>
              {registerConfig.materials.map((material) => (
                <li key={material.type} draggable onDragStart={() => handleDragStart(material)}>
                  <material.preview />
                </li>
              ))}
            </ul>
          </section>
          <section className='relative h[calc(100vh-72px)] flex-1 bg-#f0f0f0 overflow-auto flex justify-center items-center'>
            <div className='absolute right-20 top-20 flex gap-8 z-10'>
              <StepCounter />
            </div>
            <div className='absolute left-20 top-20 flex flex-col gap-8 z-10'>
              {schema.blocks.map((block) => (
                <div key={block.id}>{JSON.stringify(block)}</div>
              ))}
            </div>
            <div
              onDragEnter={handleDragEnter}
              onDragOver={e => e.preventDefault()}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onMouseDown={() => useSchemaStore.getState().clearAllFocus()}
              className='bg-white relative'
              style={{
                width: `${schema.container.width}mm`,
                height: `${schema.container.height}mm`,
                transform: `scale(${scale})`,
              }}
            >
              {schema.blocks.map((block, index) => <BlockItem key={index} block={block} />)}
              {markLine.x !== 0 && (
                <div style={{ left: markLine.x }} className='absolute top-0 bottom-0 border-1 border-l-dashed border-blue'></div>
              )}
              {markLine.y !== 0 && (
                <div style={{ top: markLine.y }} className='absolute left-0 right-0 border-1 border-t-dashed border-blue'></div>
              )}
            </div>
          </section>
          <section className='w-200'>设置器</section>
        </div>
      </main>
    </>
  )
}
