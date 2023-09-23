export interface BoundingBox {
  min: Position3d;
  max: Position3d;
}

export interface Position3d {
  x: number;
  y: number;
  z: number;
}

export type PositionConfig = Partial<Position3d>;
export const AXIS = {
  X: "X",
  Y: "Y",
  Z: "Z",
};

export type Axis = keyof typeof AXIS;

export type Bounds3D = {
  lowerBoundX: number;
  upperBoundX: number;
  lowerBoundY: number;
  upperBoundY: number;
  lowerBoundZ: number;
  upperBoundZ: number;
};
