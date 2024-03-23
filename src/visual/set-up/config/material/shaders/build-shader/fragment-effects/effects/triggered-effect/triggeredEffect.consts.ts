import {
  POINT_PARENTS,
  TRIGGERED_FRAGMENT_EFFECT,
} from "../../../buildShader.constants";
import { UniformConfig, VaryingConfig } from "../../../buildShader.types";

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
};
