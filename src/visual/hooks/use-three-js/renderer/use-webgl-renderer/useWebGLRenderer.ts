import { useMemo } from "react";
import { WebGLRenderer } from "three";
import { getRendererSize } from "../helpers/getRendererSize";
import { DEFAULT_RENDERER_PARAMS } from "../rendererConstants";
import { RendererParams } from "../types";

export const useWebGLRenderer = (
  rendererParams: RendererParams = DEFAULT_RENDERER_PARAMS
) => {
  return useMemo(() => {
    const renderer = new WebGLRenderer({
      powerPreference: "high-performance",
      antialias: true,
      alpha: true,
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    const { width, height } = getRendererSize(rendererParams);
    renderer.setSize(width, height);
    renderer.setClearColor(0x000000, 0);
    return renderer;
  }, [rendererParams]);
};
