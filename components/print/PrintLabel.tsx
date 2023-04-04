import { QrCodeRender } from "../renderCmp/QrCodeRender"
import { FieldRender } from "../renderCmp/FieldRender"
import { LogoRender } from "../renderCmp/LogoRender"
import { TextRender } from "../renderCmp/TextRender"
import { Schema } from "@/types/type"
import { FC } from "react"

type Props = {
  schema: Schema
}

export const PrintLabel: FC<Props> = (props) => {
  const { schema } = props
  return (
    <section
      style={{
        border: "1px solid #d4d4d4",
        position: "relative",
        width: `${schema.container.width}mm`,
        height: `${schema.container.height}mm`,
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
          {block.type === "qrCode" && <QrCodeRender value={block.props.value} {...block.options} {...block.props} />}
          {block.type === "field" && <FieldRender
            fontSize={block.props.fontSize}
            bold={block.props.bold}
            hideTitle={block.props.hideTitle}
            fieldName={block.props.fieldName}
            fieldValue={block.props.fieldValue}
          />}
          {block.type === "logo" && <LogoRender url={block.props.url} {...block.options} {...block.props} />}
          {block.type === "customText" && <TextRender
            fontSize={block.props.fontSize}
            bold={block.props.bold}
            hideTitle={block.props.hideTitle}
            text={block.props.text}
          />}
        </div>
      ))}
    </section>
  )
}
