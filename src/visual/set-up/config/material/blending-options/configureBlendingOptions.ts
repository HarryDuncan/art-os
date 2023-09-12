import { CustomBlending, OneFactor, SrcAlphaFactor } from "three";

export const configureBlendingOptions = (
  blendingConfig: Record<string, unknown> | undefined
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
