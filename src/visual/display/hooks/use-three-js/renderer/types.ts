import { TextureEncoding } from "three";

export interface RendererParams {
  rendererType: RendererTypes;
  clearColor?: number;
  size?: { width: number; height: number };
  outputEncoding?: TextureEncoding;
}

export enum RendererTypes {
  WEBGL = "webgl",
  CSS = "css",
}
