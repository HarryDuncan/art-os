import { AXIS } from "visual/utils/three-dimension-space/position/position.types";

export const VERTEX_EFFECTS = {
  EXPLODE: "EXPLODE",
  FILTER: "FILTER_VERTEX",
  POINTS: "POINTS",
  ROTATE: "ROTATE",
};
export const VERTEX_EFFECT_POINT_NAMES = {
  DEFAULT_POINT: "position",
  EXPLODED_POINT: "explodedPoint",
  FILTERED_POINT: "filteredPoint",
  ROTATED_POINT: "rotatedPoint",
};

export const DEFAULT_ROTATE_EFFECT_CONFIG = {
  axis: AXIS.Y,
  speed: 0.2,
};
