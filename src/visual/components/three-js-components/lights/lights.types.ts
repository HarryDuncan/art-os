import { Vector3 } from "three";

export enum LIGHT_TYPES {
  AMBIENT = "AMBIENT",
  POINT_LIGHT = "POINT_LIGHT",
  DIRECTIONAL_LIGHT = "DIRECTIONAL_LIGHT",
}
export interface LightProps {
  name: string;
  color?: string;
}
export interface AmbientLightProps extends LightProps {
  intensity?: number;
}

export interface PointLightConfig extends LightProps {
  position?: Vector3;
}
export interface DirectionalLightProps extends LightProps {
  position?: Vector3;
}
export interface LightConfigs {
  name: string;
  lightType: LIGHT_TYPES;
}
