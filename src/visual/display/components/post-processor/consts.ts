import { LinearFilter, RGBAFormat } from "three";

export const defaultRenderTargetParameters = {
  minFilter: LinearFilter,
  magFilter: LinearFilter,
  format: RGBAFormat,
  stencilBuffer: true,
};
