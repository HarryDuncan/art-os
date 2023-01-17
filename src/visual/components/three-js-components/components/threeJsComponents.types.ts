import { ColorRepresentation, Vector3 } from "three";
import { Geometry } from "types/threeJs.types";

export interface ThreeJSComponentProps {
  name: string;
}

export interface MarchingCubesProps extends ThreeJSComponentProps {}

export interface TextProps extends ThreeJSComponentProps {
  text: string;
  fontUrl: string;
  materialProps?: any;
  position: Vector3;
}

export interface MirrorProps extends ThreeJSComponentProps {
  geometry: Geometry;
  position: Vector3;
  color?: ColorRepresentation;
}
export type ComponentProps = TextProps | MarchingCubesProps | MirrorProps;

export enum COMPONENT_TYPES {
  MARCHING_CUBES = "MARCHING_CUBES",
  TEXT = "TEXT",
  MIRROR = "MIRROR",
}
