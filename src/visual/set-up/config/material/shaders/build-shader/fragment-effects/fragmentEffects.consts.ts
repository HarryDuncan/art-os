export const FRAGMENT_EFFECT = {
  DEFAULT: "DEFAULT",
  EMPTY: "EMPTY",
  COLOR: "COLOR",
  MATCAP: "MATCAP",
  MATERIAL: "MATERIAL",
  POINT_MATERIAL: "POINT_MATERIAL",
  OPACITY: "OPACITY",
  INTERACTIVE: "INTERACTIVE",
  TRIGGERED: "TRIGGERED",
  VANISH: "VANISH",
  BRIGHTNESS: "BRIGHTNESS",
};

export const FRAGMENT_COLOR_NAMES = {
  DEFAULT: "fragColor",
  MATERIAL: "fragMaterialColor",
  POINT_MATERIAL: "fragPointMaterial",
  COLOR: "fragColouredColor",
  OPACITY: "fragOpacity",
  INTERACTIVE: "fragInteractive",
  TRIGGERED: "fragTriggered",
  VANISH: "fragVanish",
  BRIGHTNESS: "fragBrightness",
};
export const DEFAULT_FRAG_COLOR = "#ff1205";
export const DEFAULT_POINT_MATERIAL = {
  pointDisplayPercentage: 0.5,
  pointDefinitions: [
    { id: "uTexture1", pointColor: "#ff1205" },
    { id: "uTexture2", pointColor: "#ff1005" },
  ],
  pointColor: "#ff1205",
};

export const DEFAULT_FRAGMENT_EFFECT_PARAMS = {
  declareInTransform: true,
};

export const TRIGGERED_FRAGMENT_EFFECT = {
  COLOR: "COLOR",
  OPACITY: "OPACITY",
  EMPTY: "EMPTY",
};

export const IMAGE_FRAGMENT_EFFECT = {};

export const INTERACTION_FRAGMENT_EFFECT = {
  COLOR: "COLOR",
};
