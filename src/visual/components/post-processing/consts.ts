import { LinearFilter, RGBFormat } from "three";

export const defaultRenderTargetParameters = {
  minFilter: LinearFilter,
  magFilter: LinearFilter,
  format: RGBFormat,
  stencilBuffer: true,
};
