import { ColorRepresentation, Material, Vector2, Vector3 } from "three";
import { Geometry } from "types/threeJs.types";

export interface ThreeJSComponentProps {
  name: string;
  position: Vector3;
}

export interface MarchingCubesProps extends ThreeJSComponentProps {
  parameters?: {
    resolution: number;
  };
  material?: Material;
}

export interface TextProps extends ThreeJSComponentProps {
  text: string;
  fontUrl: string;
  material?: Material;
}

export interface MirrorProps extends ThreeJSComponentProps {
  geometry: Geometry;

  color?: ColorRepresentation;
}

export interface SphericalBackgroundProps extends ThreeJSComponentProps {
  rotation?: Vector3;
  radius: number;
  material?: Material;
}

export interface PlaneProps extends ThreeJSComponentProps {
  size?: Vector2;
  material?: Material;
}

export interface CubeProps extends ThreeJSComponentProps {
  size?: Vector3;
  material?: Material;
}
export type ComponentProps =
  | TextProps
  | MarchingCubesProps
  | MirrorProps
  | SphericalBackgroundProps
  | CubeProps;

export const COMPONENT_TYPES = {
  MARCHING_CUBES: "MARCHING_CUBES",
  TEXT: "TEXT",
  MIRROR: "MIRROR",
  SPHERICAL_BACKGROUND: "SHPERICAL_BACKGROUND",
  PLANE: "PLANE",
  CUBE: "CUBE",
};
export type ThreeJsComponentType = keyof typeof COMPONENT_TYPES;
