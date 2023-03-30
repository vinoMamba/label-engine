export type MaterialType = 'qrCode' | 'field' | 'logo' | 'customText';

export interface Material {
  type: MaterialType;
  name: string;
  preview: any;
  renderInstance: (props?: any) => JSX.Element;
}

export interface Block {
  id: number;
  type: Material,
  focus: boolean;
  options: {
    top: number;
    left: number;
    width: number;
    height: number;
  };
}

export interface Schema {
  container: {
    width: number;
    height: number;
  };
  blocks: Block[];
}
