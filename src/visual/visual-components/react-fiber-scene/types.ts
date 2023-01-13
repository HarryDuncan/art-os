import { Vector3 } from "three";
import {
  BACKGROUND_TYPES,
  LIGHT_TYPES,
  OBJECT_TYPES,
} from "./reactFiberScene.constants";

export type ReactFiberSceneProps = {
  background: BackgroundProps;
  light: LightProps[];
  camera: CameraProps;
  objects: ReactFiberSceneObjects[];
};

export type BackgroundProps = {
  type: BACKGROUND_TYPES;
  position: Vector3;
  layers: number[];
  texture: string;
};

export type CameraProps = { position: Vector3; fov: number };

export type LightProps = {
  type: LIGHT_TYPES;
  intensity: number;
};

export type ObjectData = {
  objectType: OBJECT_TYPES;
};

export type Bounds3D = {
  lowerBoundX: number;
  upperBoundX: number;
  lowerBoundY: number;
  upperBoundY: number;
  lowerBoundZ: number;
  upperBoundZ: number;
};

export type ReactFiberSceneObjects = GTLFObject | TextObject;
export interface GTLFObject extends ObjectData {
  objectUrl: string;
  positions?: Vector3[];
  numberItems?: number;
  layers: number[];
  boundingBox?: Bounds3D;
}

export interface TextObject extends ObjectData {
  textProps: {
    fontSize: number;
    fontType: string;
  };
}
