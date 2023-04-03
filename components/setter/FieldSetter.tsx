import { fieldOptions, fontSizes } from "@/shared"
import { useSchemaStore } from "@/store/useSchemaStore"
import { Form, Checkbox, Select } from "antd"

export const FieldSetter = () => {
  const [currentBlock, updateBlock] = useSchemaStore((state) => [state.currentBlock, state.updateBlock])
  const handleFieldChange = (value: { value: string; label: React.ReactNode }) => {
    updateBlock({
      ...currentBlock!,
      props: {
        ...currentBlock!.props,
        fieldValue: value.value,
        fieldName: value.label
      }
    })
  }
  const handleFontSizeChange = (value: { value: string; label: React.ReactNode }) => {
    updateBlock({
      ...currentBlock!,
      props: {
        ...currentBlock!.props,
        fontSize: value.value
      }
    })
  }
  const handleBoldChange = (checkedValue: boolean) => {
    updateBlock({
      ...currentBlock!,
      props: {
        ...currentBlock!.props,
        bold: checkedValue
      }
    })
  }
  const handleHideTitleChange = (checkedValue: boolean) => {
    updateBlock({
      ...currentBlock!,
      props: {
        ...currentBlock!.props,
        hideTitle: checkedValue
      }
    })
  }
  return (
    <div>
      <h6 className="setter-h6">字段信息</h6>
      <Form>
        <Form.Item label="字段名称" rules={[{ required: true }]}>
          <Select
            labelInValue={true}
            value={currentBlock!.props.fieldValue}
            onChange={handleFieldChange}
            options={fieldOptions} />
        </Form.Item>
        <Form.Item label="字段大小" rules={[{ required: true }]}>
          <Select
            labelInValue={true}
            value={currentBlock!.props.fontSize}
            options={fontSizes}
            onChange={handleFontSizeChange} />
        </Form.Item>
        <Form.Item>
          <Checkbox
            checked={currentBlock!.props.bold}
            onChange={e => handleBoldChange(e.target.checked)}
          >字体加粗</Checkbox>
        </Form.Item>
        <Form.Item>
          <Checkbox
            checked={currentBlock!.props.hideTitle}
            onChange={e => handleHideTitleChange(e.target.checked)}
          >隐藏字段标题</Checkbox>
        </Form.Item>
      </Form>
    </div>
  )
}
