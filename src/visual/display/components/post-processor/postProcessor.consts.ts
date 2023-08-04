import { LinearFilter, RGBAFormat } from "three";

export const POST_PROCESSOR_PASSES = {
  BLOOM: "bloom",
};
export const defaultRenderTargetParameters = {
  minFilter: LinearFilter,
  magFilter: LinearFilter,
  format: RGBAFormat,
  stencilBuffer: true,
};
