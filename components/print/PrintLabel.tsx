import { useSchemaStore } from "@/store/useSchemaStore"
import { QrCodeRender } from "../renderCmp/QrCodeRender"
import { FieldRender } from "../renderCmp/FieldRender"
import { LogoRender } from "../renderCmp/LogoRender"
import { TextRender } from "../renderCmp/TextRender"

export const PrintLabel = () => {
  const [schema] = useSchemaStore((state) => [state.schema])
  return (
    <div
      style={{
        border: "1px solid #333",
        position: "relative",
        width: `${schema.container.width}px`,
        height: `${schema.container.height}px`,
        backgroundColor: "#fff",
      }}
    >
      {schema.blocks.map((block) => (
        <div key={block.id} style={{
          position: "absolute",
          left: block.options.left,
          top: block.options.top,
          width: block.options.width,
          height: block.options.height,
        }}>
          {block.type === "qrCode" && <QrCodeRender {...block.options} {...block.props} />}
          {block.type === "field" && <FieldRender
            fontSize={block.props.fontSize}
            bold={block.props.bold}
            hideTitle={block.props.hideTitle}
            fieldName={block.props.fieldName}
            fieldValue={block.props.fieldValue}
          />}
          {block.type === "logo" && <LogoRender {...block.options} {...block.props} />}
          {block.type === "customText" && <TextRender
            fontSize={block.props.fontSize}
            bold={block.props.bold}
            hideTitle={block.props.hideTitle}
            text={block.props.text}
          />}
        </div>
      ))}
    </div>
  )
}
