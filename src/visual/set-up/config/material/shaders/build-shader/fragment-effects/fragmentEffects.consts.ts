export const FRAGMENT_EFFECT = {
  DEFAULT: "DEFAULT",
  COLOR: "COLOR",
  MATERIAL: "MATERIAL",
  POINT_MATERIAL: "POINT_MATERIAL",
  OPACITY: "OPACITY",
  INTERACTIVE: "INTERACTIVE",
};

export const FRAGMENT_COLOR_NAMES = {
  DEFAULT: "fragColor",
  MATERIAL: "fragMaterialColor",
  POINT_MATERIAL: "fragPointMaterial",
  COLOR: "fragColouredColor",
  OPACITY: "fragOpacity",
  INTERACTIVE: "fragInteractive",
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
