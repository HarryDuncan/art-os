export enum LayerTypes {
  IMAGE = "image",
}
export type Layer = {
  layerName: string;
  layerType: LayerTypes;
  layerProps: any;
};
