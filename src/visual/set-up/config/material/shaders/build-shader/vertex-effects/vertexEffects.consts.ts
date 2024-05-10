export const VERTEX_EFFECTS = {
  EXPLODE: "EXPLODE",
  FILTER: "FILTER_VERTEX",
  POINTS: "POINTS",
  ROTATE: "ROTATE",
  MORPH: "MORPH",
  DISTORT: "DISTORT",
  ALIEN: "ALIEN",
  CLOUD: "CLOUD",
  INTERACTIVE: "INTERACTIVE",
  TRAVERSE: "TRAVERSE",
  EXPAND: "EXPAND",
  NOISE: "NOISE",
  TRIGGERED_EFFECT: "TRIGGERED",
};
export const VERTEX_EFFECT_POINT_NAMES = {
  DEFAULT_POINT: "position",
  DISTORT_POINT: "distortPoint",
  ALIEN_DISTORT: "alienPoint",
  EXPLODED_POINT: "explodedPoint",
  FILTERED_POINT: "filteredPoint",
  ROTATED_POINT: "rotatedPoint",
  CLOUD_POINT: "cloudPoint",
  MORPHED_POINT: "morphedPoint",
  EXPANDED_POINT: "expandedPoint",
  INTERACTED_POINT: "interactedPoint",
  TRAVERSE_POINT: "traversePoint",
  NOISE_POINT: "noisePoint",
  TRIGGERED_POINT: "triggeredPoint",
};

export const DEFAULT_MORPH_EFFECT_CONFIG = {
  morphCount: 2,
  preTransformConfigs: [],
};

export const enum TransformTypes {
  TRANSLATE = "TRANSLATE",
}

export const DEFAULT_VERTEX_EFFECT_PARAMS = {
  declareInTransform: true,
};
