import { Vector3 } from "three";
import { BACKGROUND_TYPES, LIGHT_TYPES } from "./reactFiberScene.constants";

export type ReactFiberSceneProps = {
  background: BackgroundProps;
  light: LightProps[];
  camera: CameraProps;
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
