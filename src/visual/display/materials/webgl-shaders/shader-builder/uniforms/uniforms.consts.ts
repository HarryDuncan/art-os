import { Vector2, Vector3 } from "three";

export const DEFAULT_UNIFORMS = {
  uPosition: {
    valueType: "vec3",
    defaultValue: new Vector3(0, 0, 0),
  },
  uResolution: {
    valueType: "vec2",
    defaultValue: new Vector2(0, 0),
  },
};

export const UNIFORM_DECLARATION = "// UNIFORM DECLARATION";
