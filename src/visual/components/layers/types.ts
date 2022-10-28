export enum LayerTypes {
  IMAGE = "image",
  OVERLAY = "overlay",
}
export type Layer = {
  layerName: string;
  layerType: LayerTypes;
  layerProps: any;
};
