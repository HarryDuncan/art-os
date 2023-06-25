import { TextureEncoding } from "three";

export enum RendererTypes {
  WEBGL = "webgl",
  CSS = "css",
}

export interface RendererParams {
  rendererType: RendererTypes;
  clearColor?: number;
  size?: { width: number; height: number };
  outputEncoding?: TextureEncoding;
}
