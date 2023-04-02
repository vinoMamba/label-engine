import { ReactNode } from "react";

export type MaterialType = 'qrCode' | 'field' | 'logo' | 'customText';

export interface Material {
  type: MaterialType;
  name: string;
  preview: () => JSX.Element;
  renderInstance: () => JSX.Element;
}

export interface Block {
  id: number;
  type: MaterialType,
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

export interface MarkLine {
  x: number;
  y: number;
}

export interface DragState {
  startX: number;
  startY: number;
  startTop: number;
  startLeft: number;
  marklineCollection: {
    x: Array<{ showLeft: number, left: number }>
    y: Array<{ showTop: number, top: number }>
  }
}
