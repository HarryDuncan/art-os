import {
  IMAGE_VERTEX_EFFECT,
  POINT_PARENTS,
} from "../../../buildShader.consts";
import { VaryingConfig } from "../../../buildShader.types";

export const DEFAULT_IMAGE_VERTEX_EFFECT_PROPS = {
  declareInTransform: true,
  pointParent: POINT_PARENTS.IMAGE_EFFECT,
  effectType: IMAGE_VERTEX_EFFECT.POINTS,
  effectProps: {},
};
export const IMAGE_VERTEX_UNIFORM_CONFIG = {
  defaultUniforms: [],
  customUniforms: [],
};
export const IMAGE_VERTEX_VARYING_CONFIG = [] as VaryingConfig[];
export const IMAGE_VERTEX_REQUIRED_FUNCTIONS = [];
export const IMAGE_VERTEX_ATTRIBUTE_CONFIG = [];
