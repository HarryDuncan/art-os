import { CustomBlending, OneFactor, SrcAlphaFactor } from "three";

export const blendingOptions = (blendingConfig) => {
  if (!blendingConfig) return {};
  // TODO - make blending options properly configurable
  return {
    blending: CustomBlending,
    blendSrc: SrcAlphaFactor,
    blendDst: OneFactor,
    transparent: true,
    depthTest: false,
  };
};
