import { CustomTextPreview, FieldPreview, LogoPreview, QrCodePreview } from "@/components/preview";
import { FieldRender } from "@/components/renderCmp/FieldRender";
import { LogoRender } from "@/components/renderCmp/LogoRender";
import { QrCodeRender } from "@/components/renderCmp/QrCodeRender";
import { TextRender } from "@/components/renderCmp/TextRender";
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
  renderInstance: QrCodeRender,
  props: {
    value: ''
  }
});

registerConfig.registerMaterial({
  type: 'field',
  name: '字段名称',
  preview: FieldPreview,
  renderInstance: FieldRender,
  props: {
    fontSize: 16,
    bold: false,
    hideTitle: false,
    fieldValue: '',
    fieldName: '',
    position: 0
  }
});

registerConfig.registerMaterial({
  type: 'logo',
  name: '公司Logo',
  preview: LogoPreview,
  renderInstance: LogoRender,
  props: {
    url: '',
  }
});

registerConfig.registerMaterial({
  type: 'customText',
  name: '自定义文本框',
  preview: CustomTextPreview,
  renderInstance: TextRender,
  props: {
    fontSize: 16,
    bold: false,
    hideTitle: false,
    text: '',
  }
});

export { registerConfig };
