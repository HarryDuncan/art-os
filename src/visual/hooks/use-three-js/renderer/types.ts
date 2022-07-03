export interface RendererParams {
  rendererType: RendererTypes;
  clearColor?: number;
  effects?: {};
  size?: { width: number; height: number };
}

export enum RendererTypes {
  WEBGL = "webgl",
  CSS = "css",
}
