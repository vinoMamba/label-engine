import { Button, Modal } from 'antd';
import { useState } from 'react';
import { PrintLabel } from './print/PrintLabel';
import { useSchemaStore } from '@/store/useSchemaStore';
export const PreviewModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [schema] = useSchemaStore(state => [state.schema])
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <Button type="primary" onClick={showModal}>
        预览
      </Button>
      <Modal
        bodyStyle={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
        destroyOnClose={true}
        width={`${schema.container.width + 25}mm`}
        centered={true}
        title="打印预览"
        open={isModalOpen}
        footer={
          <Button type="primary" onClick={handleOk} >确定</Button>
        }
      >
        <PrintLabel />
      </Modal>
    </>
  );
}
