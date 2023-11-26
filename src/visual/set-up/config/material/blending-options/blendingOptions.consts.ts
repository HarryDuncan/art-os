export const BLEND_SRC_KEYS = {
  SRC_ALPHA: "SRC_ALPHA",
  ONE: "ONE",
  ZERO: "ZERO",
};

export const BLEND_DST_KEYS = {
  SRC_COLOR: "SRC_COLOR",
  ONE: "ONE",
  ZERO: "ZERO",
  SRC_ALPHA: "SRC_ALPHA",
};

export const DEFAULT_BLENDING_OPTIONS = {
  blendSrcKey: BLEND_SRC_KEYS.SRC_ALPHA,
  blendDstKey: BLEND_DST_KEYS.ONE,
  transparent: false,
  depthTest: true,
};
