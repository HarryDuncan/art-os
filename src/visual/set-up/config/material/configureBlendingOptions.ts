import { CustomBlending, OneFactor, SrcAlphaFactor } from "three";
import { BlendingConfig } from "visual/display/materials/materials.types";

export const configureBlendingOptions = (
  blendingConfig: BlendingConfig | undefined
) => {
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
