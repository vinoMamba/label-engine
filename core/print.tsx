import { PrintLabel } from '@/components/print/PrintLabel'
import { renderToString } from 'react-dom/server'
import { Schema, labelInfo } from '@/types/type'
import { readFileSync } from 'fs'
import { resolve } from "path"

export const getTemplate = () => {
  const path = resolve(__dirname, "..", "..", "..", "core", "template.html")
  const template = readFileSync(path, 'utf-8')

  return template
}

export const createLabel = (type: number, labelList: labelInfo[], logoUrl: string, schema: Schema) => {
  switch (type) {
    case 1:
      break
    case 2:
      break
    case 3:
      break
    case 4:
      return createCustomLabel(labelList, logoUrl, schema)
    default:
      break
  }
}

//下面代码理不理解不重要，因为后端返回的数据格式奇奇怪怪的，所以这里要做一些处理。想优雅一点去找后端处理
function createCustomLabel(labelList: labelInfo[], logoUrl: string, schema: Schema) {
  const List = () => <>{
    labelList.map((label) => {
      const neSchema = {
        ...schema,
        blocks: schema.blocks.map((block) => {
          switch (block.type) {
            case "qrCode":
              return {
                ...block,
                props: {
                  ...block.props,
                  value: label.qrCodeUrl
                }
              }
            case 'field':
              return {
                ...block,
                props: {
                  ...block.props,
                  fieldValue: label.assetLabelFieldList.find((item) => item.fieldName === block.props.fieldName)?.fieldValue
                }
              }
            case 'logo':
              return {
                ...block,
                props: {
                  ...block.props,
                  url: logoUrl
                }
              }
            default:
              return block
          }
        })
      }
      return (<PrintLabel key={label.assetInfoId} schema={neSchema} />)
    })
  }</>
  const html = renderToString(<List />)
  const template = getTemplate()
  const result = template.replace("{{labelContent}}", html)
  return result
}
