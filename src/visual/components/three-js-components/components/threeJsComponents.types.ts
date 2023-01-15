export interface ThreeJSComponentProps {
  name: string;
}

export interface MarchingCubesProps extends ThreeJSComponentProps {}

export interface TextProps extends ThreeJSComponentProps {
  text: string;
  font: any;
}

export type ComponentProps = TextProps | MarchingCubesProps;

export enum COMPONENT_TYPES {
  MARCHING_CUBES = "MARCHING_CUBES",
  TEXT = "TEXT",
}
