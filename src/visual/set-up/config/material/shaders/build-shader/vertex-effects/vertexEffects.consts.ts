import { AXIS } from "visual/utils/three-dimension-space/position/position.types";

export const VERTEX_EFFECTS = {
  EXPLODE: "EXPLODE",
  FILTER: "FILTER_VERTEX",
  POINTS: "POINTS",
  ROTATE: "ROTATE",
  MORPH: "MORPH",
  DISTORT: "DISTORT",
  ALIEN: "ALIEN",
  INTERACTIVE: "INTERACTIVE",
};
export const VERTEX_EFFECT_POINT_NAMES = {
  DEFAULT_POINT: "position",
  DISTORT_POINT: "distortPoint",
  ALIEN_DISTORT: "alienPoint",
  EXPLODED_POINT: "explodedPoint",
  FILTERED_POINT: "filteredPoint",
  ROTATED_POINT: "rotatedPoint",
  MORPHED_POINT: "morphedPoint",
  INTERACTED_POINT: "interactedPoint",
};

export const DEFAULT_ROTATE_EFFECT_CONFIG = {
  axis: AXIS.Y,
  speed: 0.2,
};

export const DEFAULT_MORPH_EFFECT_CONFIG = {
  morphCount: 2,
  preTransformConfigs: [],
};

export const DEFAULT_POINT_EFFECT_CONFIG = {
  pointSize: 20,
};
export const enum TransformTypes {
  TRANSLATE = "TRANSLATE",
}
