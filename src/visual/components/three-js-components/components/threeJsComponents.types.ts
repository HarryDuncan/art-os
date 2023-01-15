import { Geometry } from "types/threeJs.types";

export interface ThreeJSComponentProps {
  name: string;
}

export interface MarchingCubesProps extends ThreeJSComponentProps {}

export interface TextProps extends ThreeJSComponentProps {
  text: string;
  font: any;
  materialProps?: any;
}

export interface MirrorProps extends ThreeJSComponentProps {
  geometry: Geometry;
}
export type ComponentProps = TextProps | MarchingCubesProps | MirrorProps;

export enum COMPONENT_TYPES {
  MARCHING_CUBES = "MARCHING_CUBES",
  TEXT = "TEXT",
  MIRROR = "MIRROR",
}
