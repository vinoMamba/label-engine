import { CustomTextPreview, FieldPreview, LogoPreview, QrCodePreview } from "@/components/preview";
import { Material } from "@/types/type";

function createMeterial() {
  const materials: Material[] = [];
  const materialsMap = new Map<string, Material>();
  return {
    materials,
    materialsMap,
    registerMaterial: (material: Material) => {
      materials.push(material);
      materialsMap.set(material.type, material);
    },
  };
}

const registerConfig = createMeterial();

registerConfig.registerMaterial({
  type: 'qrCode',
  name: '资产二维码',
  preview: QrCodePreview,
  renderInstance: () => <div>二维码渲染</div>,
});

registerConfig.registerMaterial({
  type: 'field',
  name: '字段名称',
  preview: FieldPreview,
  renderInstance: () => <div className="h-172">字段名称渲染</div>,
});

registerConfig.registerMaterial({
  type: 'logo',
  name: '公司Logo',
  preview: LogoPreview,
  renderInstance: () => <div>Logo渲染</div>,
});

registerConfig.registerMaterial({
  type: 'customText',
  name: '自定义文本框',
  preview: CustomTextPreview,
  renderInstance: () => <div>文本框渲染</div>,
});

export { registerConfig };
