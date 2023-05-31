import { RendererParams } from "../types";

export const getRendererSize = (rendererParams: RendererParams) => {
  const { size } = rendererParams;
  if (!size) return { width: window.innerWidth, height: window.innerHeight };
  return { width: size.width, height: size.height };
};
