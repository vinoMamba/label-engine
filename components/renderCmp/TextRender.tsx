import { FC } from "react"

type Props = {
  fontSize: number
  bold: boolean
  hideTitle: boolean
  text: string
}
export const TextRender: FC<Props> = (props) => {
  return (
    <span
      style={{
        fontSize: `${props.fontSize || 14}px`,
        fontWeight: props.bold ? 'bold' : 'normal',
      }}
      className="p-0 m-0 overflow-hidden whitespace-nowrap">
      {props.text || '自定义文本内容'}
    </span>
  )
}
