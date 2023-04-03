import { Form, InputNumber } from "antd"
import { useSchemaStore } from "@/store/useSchemaStore"

export const QrCodeSetter = () => {
  const [currentBlock, updateBlock] = useSchemaStore((state) => [state.currentBlock, state.updateBlock])
  const valueChange = (value: number | null) => {
    if (!value) return
    updateBlock({
      ...currentBlock!,
      options: {
        ...currentBlock!.options,
        width: value,
        height: value
      }
    })
  }
  return (
    <div>
      <h6>资产二维码</h6>
      <Form>
        <Form.Item label="宽度" rules={[{ required: true }]}>
          <InputNumber value={currentBlock!.options.width} onChange={valueChange} />
        </Form.Item>
        <Form.Item label="高度" rules={[{ required: true }]}>
          <InputNumber value={currentBlock!.options.height} onChange={valueChange} />
        </Form.Item>
      </Form>
    </div>
  )
}
