import { MeshBasicMaterial, Vector3 } from "three";
import {
  LightType,
  LIGHT_TYPES,
} from "visual/components/three-js-components/lights/lights.types";

export const DEFAULT_POSITION = { x: 0, y: 0, z: 0 };
export const DEFAULT_VECTOR_POSITION = new Vector3(0, 0, 0);
export const DEFAULT_LIGHTS = [
  {
    name: "ambient-light",
    lightType: LIGHT_TYPES.AMBIENT as LightType,
    props: { intensity: 1.0 },
  },
  {
    name: "point-light",
    lightType: LIGHT_TYPES.POINT_LIGHT as LightType,
    props: { color: "#ffffff" },
  },
  {
    name: "directional-light",
    lightType: LIGHT_TYPES.DIRECTIONAL_LIGHT as LightType,
    props: { color: "#ffffff" },
  },
];

export const GREEN_SCREEN = new MeshBasicMaterial({
  color: "#00ff00",
});
