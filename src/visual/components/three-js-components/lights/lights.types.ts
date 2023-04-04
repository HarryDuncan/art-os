import { Vector3 } from "three";

export const LIGHT_TYPES = {
  AMBIENT: "AMBIENT",
  POINT_LIGHT: "POINT_LIGHT",
  DIRECTIONAL_LIGHT: "DIRECTIONAL_LIGHT",
};

export type LightType = keyof typeof LIGHT_TYPES;

export interface LightConfigProperties {
  color?: string;
  position?: Vector3;
  intensity?: number;
}
export interface AmbientLightConfig extends LightConfigProperties {}

export interface PointLightConfig extends LightConfigProperties {}

export interface DirectionalLightConfig extends LightConfigProperties {}

export type LightParameters =
  | AmbientLightConfig
  | DirectionalLightConfig
  | PointLightConfig;

export interface LightConfigs {
  name: string;
  lightType: LightType;
  props?: LightParameters;
}
