export interface BoundingBox {
  min: ThreeDPosition;
  max: ThreeDPosition;
}

export interface ThreeDPosition {
  x: number;
  y: number;
  z: number;
}

export enum AXIS {
  X = "X",
  Y = "Y",
  Z = "Z",
}
