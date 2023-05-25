export interface BoundingBox {
  min: ThreeDPosition;
  max: ThreeDPosition;
}

export interface ThreeDPosition {
  x: number;
  y: number;
  z: number;
}

export type PositionConfig = Partial<ThreeDPosition>;
export const AXIS = {
  X: "X",
  Y: "Y",
  Z: "Z",
};

export type Axis = keyof typeof AXIS;
