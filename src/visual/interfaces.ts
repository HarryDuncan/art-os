export type ContainerNode =
  | React.MutableRefObject<Element>
  | React.MutableRefObject<null>
  | React.MutableRefObject<JSX.Element>;

// ###################
// Object Positions
// ##################

export interface I2DPosition {
  x: number;
  y: number;
}

export interface I3DPosition {
  x: number;
  y: number;
  z: number;
}

// ###################
// DIMENSIONS
// ##################

export interface I3DDimension {
  height: number;
  width: number;
  depth: number;
}

export interface I2DDimension {
  height: number;
  width: number;
}

// #############
// TEXTURES
// ###########

export interface ITextureProp {
  path: string;
  name?: string;
}
