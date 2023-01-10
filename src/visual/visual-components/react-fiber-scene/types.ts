import { BACKGROUND_TYPES } from "./reactFiberScene.constants";

export type ReactFiberSceneProps = {
  background: BackgroundProps;
  light: LightProps;
  camera: CameraProps;
};

export type BackgroundProps = {
  type: BACKGROUND_TYPES;
  position: number[];
  layers: number[];
  texture: string;
};

export type LightProps = {};

export type CameraProps = { position: number[]; fov: number };
