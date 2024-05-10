import {
  POINT_PARENTS,
  TRIGGERED_FRAGMENT_EFFECT,
} from "../../../buildShader.consts";
import {
  TriggeredVertexEffect,
  UniformConfig,
  VaryingConfig,
} from "../../../buildShader.types";

export const TRIGGERED_UNIFORM_CONFIG = {
  defaultUniforms: ["uIsTriggered"],
  customUniforms: [],
} as UniformConfig;

export const TRIGGERED_VARYING_CONFIG = [
  {
    id: "vTriggered",
    valueType: "FLOAT",
    varyingType: "CUSTOM",
    value: "isTriggered",
  },
] as VaryingConfig[];

export const DEFAULT_TRIGGERED_EFFECT = {
  declareInTransform: false,
  pointParent: POINT_PARENTS.TRIGGERED,
  effectType: TRIGGERED_FRAGMENT_EFFECT.EMPTY,
} as unknown as Partial<TriggeredVertexEffect>;
