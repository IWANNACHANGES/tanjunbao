declare module "*.css";
declare module "*.less";
declare module "*.png";

declare interface ICocoData {
  width: number;
  height: number;
  id: string | number;
  filename: string;
  annotations: ICocoAnnotations[];
}

declare interface ICocoAnnotations {
  bbox: number[];
  category: {
    name: string;
    supercategory: string;
    text: string;
  };
  confidence: number;
  id: string;
}
